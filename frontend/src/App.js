import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import { Navbar, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import GameBoard from './components/GameBoard';
import Constants from './helpers/Constants';
import LoadingSpinner from './components/LoadingSpinner';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      difficulties: [],
      selectedDifficultyId: null,
      isLoading: false,
      error: null
    }
  }

  componentDidMount() {
    this.setState({
      isLoading: true
    })

    // We'll pre-load the difficulties
    axios.get(Constants.DIFFICULTY_ENDPOINT)
      .then((result) => {
        this.setState({
          isLoading: false,
          difficulties: result.data,
        });
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
          error
        });
      });
  }

  handleDifficultySelect(eventKey) {
    this.setState({
      selectedDifficultyId: eventKey
    });
  }

  render() {
    const { error, isLoading } = this.state;
    if (error) {
      return (
        <div>There was an error loading the game. Please try again.</div>
      );
    } else {
      let difficultyElements = this.state.difficulties.map((difficulty) => {
        return (
          <MenuItem key={difficulty.id} eventKey={difficulty.id} onSelect={this.handleDifficultySelect.bind(this)}>{difficulty.name}</MenuItem> 
        )
      });

      let selectedDifficultyString = 'Select Difficulty';
      if (this.state.selectedDifficultyId) {
        const selectedDifficulty = this.state.difficulties.find((x) => x.id === this.state.selectedDifficultyId);
        selectedDifficultyString = selectedDifficulty.name;
      }

      return (
        <div>
          <Navbar>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/">Minesweeper</a>
              </Navbar.Brand>
            </Navbar.Header>
            <Nav>
            </Nav>
            <Nav pullRight>
            <NavDropdown eventKey={3} title={selectedDifficultyString} id="basic-nav-dropdown">
              {difficultyElements}
            </NavDropdown>
            </Nav>
          </Navbar>

          <GameBoard difficulties={this.state.difficulties} selectedDifficultyId={this.state.selectedDifficultyId}/>

          {isLoading && <LoadingSpinner/>}
        </div>
      );
    }
  }
}

export default App;

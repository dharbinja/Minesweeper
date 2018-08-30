import React, { Component } from 'react';
import './App.css';
import MinesweeperService from './services/MinesweeperService';
import logo from './images/minesweeper_logo.png';
import { Navbar, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import GameBoard from './components/GameBoard/GameBoard';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import ErrorViewer from './components/ErrorViewer/ErrorViewer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      difficulties: [],
      selectedDifficultyId: null,
      isLoading: false,
      error: null,
      minesweeperService: new MinesweeperService()
    }
  }

  /**
   * Calls our API to get a set of difficulties
   */
  componentDidMount() {
    this.setState({
      isLoading: true
    })

    // We'll pre-load the difficulties
    this.state.minesweeperService.getDifficulties()
      .then((difficulties) => {
        this.setState({
          isLoading: false,
          difficulties: difficulties,
        });
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
          error
        });
      });
  }

  /**
   * Changes which difficulty has been selected from the navbar dropdown
   * 
   * @param {int} The id of the difficulty that was selected 
   */
  handleDifficultySelect(eventKey) {
    this.setState({
      selectedDifficultyId: eventKey
    });
  }

  /**
   * Renders the component
   */
  render() {
    const { error, isLoading } = this.state;
    if (error) {
      return (
        <ErrorViewer error={error} />
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
                <img className="logo" src={logo} alt="logo" />
              </Navbar.Brand>
              <Navbar.Brand>
                Minesweeper
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

          <GameBoard 
            difficulties={this.state.difficulties} 
            selectedDifficultyId={this.state.selectedDifficultyId} 
            minesweeperService={this.state.minesweeperService}
            />

          {isLoading && <LoadingSpinner />}
        </div>
      );
    }
  }
}

export default App;

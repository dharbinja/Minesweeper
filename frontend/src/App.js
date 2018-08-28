import React, { Component } from 'react';
import './App.css';
import { Navbar, Nav, Grid, Row } from 'react-bootstrap'
import GameBoard from './components/GameBoard'

class App extends Component {
  render() {
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
        </Navbar>

        <Grid>
          <Row className="text-center"><GameBoard/></Row>
        </Grid>
      </div>
    );
  }
}

export default App;

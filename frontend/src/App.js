import React, { Component } from 'react';
import './App.css';
import Minesweeper from './components/Minesweeper/Minesweeper';
import Login from './components/Login/Login';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false
    }
  }

  /**
   * Calls our API to get a set of difficulties
   */
  componentDidMount() {
    //isAuthenticated = true;
  }

  /**
   * Renders the component
   */
  render() {
    let content;
    if (this.state.isAuthenticated) {
      content = (
        <Minesweeper />
      )
    } else {
      content = (
        <Login />
      )
    }

    return (
      <div className="text-center">
        {content}
      </div>
    );
  }
}

export default App;

import React from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import Spinner from 'react-spinkit';
import Constants from '../helpers/Constants';
import TileGrid from './TileGrid';
import GameTimer from './GameTimer';
import FlagCounter from './FlagCounter';
import LoadingSpinner from './LoadingSpinner';

class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      isStartingNewGame: false,
      dateStarted: [],
      dateEnded: [],
      currentGame: null
    }
  }

  componentDidMount() {
    // We'll make an API request to get the current game being played (the last started)
    axios.get(Constants.GAMES_ENDPOINT)
      .then((result) => {
        this.setState({
          isLoaded: true,
          // Remember that the games come back sorted by last started
          currentGame: result.data[0]
        });
      })
      .catch((error) => {
        this.setState({
          isLoaded: true,
          error
        });
      });
  }

  handleNewGameClick() {
    this.setState({ isStartingNewGame: true });

    // Here we'll start a new game
    axios.post(Constants.GAMES_ENDPOINT, {
      difficulty: this.props.selectedDifficultyId || this.state.currentGame.difficulty
    })
      .then((result) => {
        this.setState({
          isStartingNewGame: false,
          currentGame: result.data
        });
      })
      .catch((error) => {
        this.setState({
          isStartingNewGame: false,
          error
        });
      })
  }

  render() {
    const { error, isLoaded, isStartingNewGame } = this.state;
    if (error) {
      return (
        <div className="text-center">
          <div>Error: {error.message}</div>
        </div>
      );
    } else if (!isLoaded) {
      return (
        <div className="text-center">
          <Spinner name='circle'/>
        </div>
      );
    } else {
      // Build our Game Grid
      const currentGame = this.state.currentGame;
      const gameDifficulty = this.props.difficulties.find(difficulty => difficulty.id === currentGame.difficulty);
      const rows = gameDifficulty.rows;
      const columns = gameDifficulty.columns;

      return (
        <div className="text-center">
          <div className="minesweeper-board-container">
            <GameTimer timeStarted={currentGame.time_started} />
            <Button
              bsStyle="primary"
              disabled={isStartingNewGame}
              onClick={!isStartingNewGame ? this.handleNewGameClick.bind(this) : null}
            >
              New Game
            </Button>
            <FlagCounter tiles={this.state.currentGame.tile_set} totalMines={gameDifficulty.num_mines} />
            <div><br /></div>
            <TileGrid rows={rows} cols={columns} tiles={this.state.currentGame.tile_set} />
          </div>

          {isStartingNewGame && <LoadingSpinner spinnerText="Starting New Game..."/>}
        </div>
      )
    }
  }
}

export default GameBoard;
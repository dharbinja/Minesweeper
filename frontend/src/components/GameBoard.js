import React from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
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
      currentGame: null,
      tiles: []
    }
  }

  getGameStateFromServer() {
    return axios.get(Constants.GAMES_ENDPOINT + this.state.currentGame.id + '/')
      .then((result) => {
        const currentGame = result.data;

        this.setState({
          currentGame: currentGame,
          tiles: currentGame.tile_set
        });
      })
      .catch((error) => {
        this.setState({
          error
        });
      });
  }

  componentDidMount() {
    // We'll make an API request to get the current game being played (the last started)
    axios.get(Constants.GAMES_ENDPOINT)
      .then((result) => {
        const currentGame = result.data[0];

        if (currentGame) {
          // A game already exist, we'll continue it
          this.setState({
            isLoaded: true,
            // Remember that the games come back sorted by last started
            currentGame: currentGame,
            tiles: currentGame.tile_set
          });
        } else {
          // No game exists, we'll start a new one
          return this.createNewGame()
        }
      })
      .catch((error) => {
        this.setState({
          isLoaded: true,
          error
        });
      });
  }

  handleNewGameClick() {
    this.createNewGame();
  }

  createNewGame() {
    this.setState({ isStartingNewGame: true });

    // Default to Easy
    let newDifficulty = 1;
    // Top precedence goes to the selected difficulty that's passed in
    if (this.props.selectedDifficultyId) {
      newDifficulty = this.props.selectedDifficultyId;
    }
    // Secondary precedence goes to the current game difficulty 
    else if (this.state.currentGame) {
      newDifficulty = this.state.currentGame.difficulty;
    }

    // Here we'll start a new game
    return axios.post(Constants.GAMES_ENDPOINT, {
      difficulty: newDifficulty
    })
      .then((result) => {
        this.setState({
          isLoaded: true,
          isStartingNewGame: false,
          currentGame: result.data,
          tiles: result.data.tile_set
        });
      })
      .catch((error) => {
        this.setState({
          isLoaded: true,
          isStartingNewGame: false,
          error
        });
      })
  }

  handleTileRightClick(event, clickedTile) {
    event.preventDefault();

    // We'll ignore the click if the game is over
    if (this.state.currentGame.result !== '') {
      return;
    }

    // On right click of a tile, we will "flag"/"unflag" the tile.
    // We do this by making a PUT call to the server with
    // the tile that we want to flag/unflag
    axios.put(Constants.TILE_ENDPOINT + clickedTile.id + '/', {
      status: clickedTile.status === 'Flagged' ? 'Closed' : 'Flagged'
    })
    .then((result) => {
      // We can't modify the tiles individually so we'll have to make
      // a copy and set them that way
      let updatedTiles = Object.assign(this.state.tiles);
      let editedTile = updatedTiles.find((tile) => tile.id === clickedTile.id);
      editedTile.status = result.data.status;
      editedTile.is_mine = result.data.is_mine;
      editedTile.neighbouring_mines = result.data.neighbouring_mines;

      // Now update the state
      this.setState({
        tiles: updatedTiles
      })
    })
    .catch((error) => {
      this.setState({
        error
      });
    });
  }

  handleTileLeftClick(event, clickedTile) {
    event.preventDefault();

    // We'll ignore the click if the game is over
    if (this.state.currentGame.result !== '') {
      return;
    }

    // On left click of a tile, we will "open" the tile.
    // We do this by making a PUT call to the server with
    // the tile that we want to open
    axios.put(Constants.TILE_ENDPOINT + clickedTile.id + '/', {
      status: 'Opened'
    })
    .then(() => {
      return this.getGameStateFromServer();
    })
    .catch((error) => {
      this.setState({
        error
      });
    });
  }

  render() {
    const { error, isLoaded, isStartingNewGame, currentGame } = this.state;
    if (error) {
      return (
        <div className="text-center">
          <div>Fatal Error: {error.message}</div>
        </div>
      );
    } else if (!isLoaded) {
      return (
        <LoadingSpinner spinnerText="Loading Game Data..." />
      );
    } else {
      // Build our Game Grid
      const gameDifficulty = this.props.difficulties.find(difficulty => difficulty.id === currentGame.difficulty);
      const rows = gameDifficulty.rows;
      const columns = gameDifficulty.columns;

      return (
        <div className="text-center">
          <div className="minesweeper-board-container">
            <GameTimer timeStarted={currentGame.time_started} timeEnded={currentGame.time_ended} />
            <Button
              bsStyle="primary"
              disabled={isStartingNewGame}
              onClick={!isStartingNewGame ? this.handleNewGameClick.bind(this) : null}
            >
            New Game
            </Button>
            <FlagCounter tiles={this.state.currentGame.tile_set} totalMines={gameDifficulty.num_mines} />
            <div><br /></div>
            <TileGrid 
              rows={rows} 
              cols={columns} 
              tiles={this.state.currentGame.tile_set} 
              onLeftClick={this.handleTileLeftClick.bind(this)} 
              onRightClick={this.handleTileRightClick.bind(this)}
              />

            <div>{currentGame.result}</div>
          </div>

          {isStartingNewGame && <LoadingSpinner spinnerText="Starting New Game..."/>}
        </div>
      )
    }
  }
}

export default GameBoard;
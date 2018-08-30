import React from 'react';
import axios from 'axios';
import './GameBoard.css';
import Constants from '../../helpers/Constants';
import TileGrid from '../TileGrid/TileGrid';
import GameTimer from '../GameTimer/GameTimer';
import FlagCounter from '../FlagCounter/FlagCounter';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import NewGameButton from '../NewGameButton/NewGameButton';

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

    this.handleNewGameClick = this.handleNewGameClick.bind(this);
    this.handleTileLeftClick = this.handleTileLeftClick.bind(this);
    this.handleTileRightClick = this.handleTileRightClick.bind(this);
  }

  getGameStateFromServer() {
    var gamePromise = axios.get(Constants.GAMES_ENDPOINT + this.state.currentGame.id + '/');
    var tilesPromise = axios.get(Constants.TILE_ENDPOINT + '?game=' + this.state.currentGame.id);

    return Promise.all([gamePromise, tilesPromise])
      .then((result) => {
        const currentGame = result[0].data;
        const tiles = result[1].data;

        this.setState({
          currentGame: currentGame,
          tiles: tiles
        });
      })
      .catch((error) => {
        this.setState({
          error
        });
      });
  }

  componentDidMount() {
    // We'll make an API request to get the current game being played and all of it's tiles.
    axios.get(Constants.GAMES_ENDPOINT)
      .then((result) => {
        const currentGame = result.data[0];

        if (currentGame) {
          // A game already exist, we'll continue it
          this.setState({
            // Remember that the games come back sorted by last started
            currentGame: currentGame
          });

          // We'll also get the tiles for it
          return axios.get(Constants.TILE_ENDPOINT + '?game=' + currentGame.id)
        } 
        return null;
      })
      .then((result) => {
        if (result) {
          const tiles = result.data;

          // If we have a result, it means we got our tiles back!
          this.setState({
            isLoaded: true,
            tiles: tiles
          });
        } else {
          // If we have no data, it means no game exists, we'll start a new one!
          return this.createNewGame();
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
      // First we make a call to create a new game
      .then((result) => {
        const newGame = result.data;
        this.setState({
          currentGame: newGame
        });
        return axios.get(Constants.TILE_ENDPOINT + '?game=' + newGame.id); 
      })
      // Then we'll retrieve the tile set
      .then((result) => {
        const tiles = result.data;
        this.setState({
          isLoaded: true,
          isStartingNewGame: false,
          tiles: tiles
        })
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
          <div>There was an error loading the game. Please try again or contact <a href="mailto:dharbinja@yahoo.ca">dharbinja@yahoo.ca</a>.</div>
          < br/>
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
            <div className="minesweeper-board-header">
              <GameTimer timeStarted={currentGame.time_started} timeEnded={currentGame.time_ended} />
              <NewGameButton isStartingNewGame={isStartingNewGame} result={currentGame.result} onClick={this.handleNewGameClick} />
              <FlagCounter tiles={this.state.tiles} totalMines={gameDifficulty.num_mines} />
            </div>
            <TileGrid
              rows={rows}
              cols={columns}
              tiles={this.state.tiles}
              onLeftClick={this.handleTileLeftClick}
              onRightClick={this.handleTileRightClick}
            />
          </div>

          {isStartingNewGame && <LoadingSpinner spinnerText="Starting New Game..." />}
        </div>
      )
    }
  }
}

export default GameBoard;
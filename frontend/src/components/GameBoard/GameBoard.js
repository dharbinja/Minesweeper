import React from 'react';
import './GameBoard.css';
import TileGrid from '../TileGrid/TileGrid';
import GameTimer from '../GameTimer/GameTimer';
import FlagCounter from '../FlagCounter/FlagCounter';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import NewGameButton from '../NewGameButton/NewGameButton';
import ErrorViewer from '../ErrorViewer/ErrorViewer';

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

    // Bind this to all of our click handlers so we can access state and props
    // and not have to do it in the JSX
    this.handleNewGameClick = this.handleNewGameClick.bind(this);
    this.handleTileLeftClick = this.handleTileLeftClick.bind(this);
    this.handleTileRightClick = this.handleTileRightClick.bind(this);
  }

  componentDidMount() {
    // We'll make an API request to get the current game being played and all of it's tiles.
    // If one doesn't exist, we'll ask the service to start a new one.
    this.props.minesweeperService.getCurrentOrCreateNewGame()
      .then((result) => {
        this.setState({
          currentGame: result.game,
          tiles: result.tiles,
          isLoaded: true
        });
      })
      .catch((error) => {
        this.setState({
          isLoaded: true,
          error
        });
      });
  }

  /**
   * Invoked when the smiley face new game button is clicked. It will 
   * deal with the back-end to start a new game.
   */
  handleNewGameClick() {
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

    // We'll start a new game and update the game and tiles
    this.props.minesweeperService.createGame(newDifficulty)
      .then((result) => {
        const newGame = result;
        this.setState({
          currentGame: newGame
        });
        return this.props.minesweeperService.getTiles(newGame.id);
      })
      .then((result) => {
        const tiles = result;
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

  /**
   * Called when a right click is done on a tile. It will send a "flag" 
   * update to the server for that particular tile and retrieve back
   * the new game state. 
   * 
   * @param {Object} event       The click event
   * @param {Object} clickedTile The clicked tile
   */
  handleTileRightClick(event, clickedTile) {
    event.preventDefault();

    // We'll ignore the click if the game is over
    if (this.state.currentGame.result !== '') {
      return;
    }

    // On right click of a tile, we will "flag"/"unflag" the tile.
    // We do this by making a PUT call to the server with
    // the tile that we want to flag/unflag
    let newStatus = clickedTile.status === 'Flagged' ? 'Closed' : 'Flagged';
    this.props.minesweeperService.updateTile(clickedTile.id, newStatus)
      .then((result) => {
        // We can't modify the tiles individually so we'll have to make
        // a copy and set them that way
        let updatedTiles = Object.assign(this.state.tiles);
        let editedTile = updatedTiles.find((tile) => tile.id === clickedTile.id);
        editedTile.status = result.status;
        editedTile.is_mine = result.is_mine;
        editedTile.neighbouring_mines = result.neighbouring_mines;

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

  /**
   * Called when a left click is done on a tile. It will send a "open" 
   * update to the server for that particular tile and retrieve back
   * the new game state. 
   * 
   * @param {Object} event       The click event
   * @param {Object} clickedTile The clicked tile
   */
  handleTileLeftClick(event, clickedTile) {
    event.preventDefault();

    // We'll ignore the click if the game is over
    if (this.state.currentGame.result !== '') {
      return;
    }

    // On left click of a tile, we will "open" the tile.
    // We'll now call our service to update the tile on the back-end
    this.props.minesweeperService.updateTile(clickedTile.id, 'Opened')
      .then(() => {
        return this.props.minesweeperService.getGame(this.state.currentGame.id)
      })
      .then((result) => {
        const currentGame = result[0];
        const tiles = result[1];

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

  render() {
    const { error, isLoaded, isStartingNewGame, currentGame } = this.state;
    if (error) {
      return (
        <ErrorViewer error={error} />
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
import React from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import TileGrid from './TileGrid';
import GameTimer from './GameTimer';
import FlagCounter from './FlagCounter';

const API_URL = 'http://localhost:8000/api/v1';
const GAMES_ENDPOINT = '/game/';
const DIFFICULTY_ENDPOINT = '/difficulty/';

class GameBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            isStartingNewGame: false,
            dateStarted: [],
            dateEnded: [],
            difficulties: null,
            currentGame: null
        }
    }

    componentDidMount() {
        // We'll make two API calls here. One to get the game difficulties, and one to get
        // the 
        let difficultiesRequest = axios.get(API_URL + DIFFICULTY_ENDPOINT);
        let gamesRequest = axios.get(API_URL + GAMES_ENDPOINT);

        Promise.all([difficultiesRequest, gamesRequest])
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        difficulties: result[0].data,
                        // Remember that the games come back sorted by last started
                        currentGame: result[1].data[0]
                    });
                },
                (error) => {
                    this.setState({
                      isLoaded: true,
                      error
                    });
                  }
            );
    }

    handleNewGameClick() {
        this.setState({ isStartingNewGame: true });

        // Here we'll start a new game
        axios.post(API_URL+GAMES_ENDPOINT, {
            // TODO: We should use a setting here for the difficulty
            difficulty: this.state.currentGame.difficulty
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
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            // Build our Game Grid
            const currentGame = this.state.currentGame;
            const gameDifficulty = this.state.difficulties.find(difficulty => difficulty.id === currentGame.difficulty);
            const rows = gameDifficulty.rows;
            const columns = gameDifficulty.columns;
            
            return (
                <div className="text-center">
                    <div className="minesweeper-board-container">
                        <GameTimer timeStarted={currentGame.time_started}/>
                        <Button
                            bsStyle="primary"
                            disabled={isStartingNewGame}
                            onClick={!isStartingNewGame ? this.handleNewGameClick.bind(this) : null}
                        >
                            New Game
                        </Button>
                        <FlagCounter tiles={this.state.currentGame.tile_set} totalMines={gameDifficulty.num_mines}/>
                        <div><br/></div>
                        <TileGrid rows={rows} cols={columns} tiles={this.state.currentGame.tile_set}/>
                    </div>
                </div>
            )
        }
    }
}

export default GameBoard;
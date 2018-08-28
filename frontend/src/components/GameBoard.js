import React from 'react';
import { Grid, Row, Button } from 'react-bootstrap';
import axios from 'axios';
import TileGrid from './TileGrid';
import GameTimer from './GameTimer';

const API_ENDPOINT = 'http://localhost:8000/api/v1';
const GAMES_ENDPOINT = '/game/';
const DIFFICULTY_ENDPOINT = '/difficulty/';

class GameBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            dateStarted: [],
            dateEnded: [],
            difficulties: null,
            currentGame: null
        }
    }

    componentDidMount() {
        // We'll make two API calls here. One to get the game difficulties, and one to get
        // the 
        let difficultiesRequest = axios.get(API_ENDPOINT + DIFFICULTY_ENDPOINT);
        let gamesRequest = axios.get(API_ENDPOINT + GAMES_ENDPOINT);

        Promise.all([difficultiesRequest, gamesRequest])
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        difficulties: result[0].data,
                        // Remember that the games come back sorted by last started
                        currentGame: result[1].data[0]
                    })
                },
                (error) => {
                    this.setState({
                      isLoaded: true,
                      error
                    });
                  }
            );
    }

    render() {
        const { error, isLoaded } = this.state;
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
                <div>
                    <Grid>
                        <Row>
                            <GameTimer timeStarted={currentGame.time_started}/>
                            <Button>New Game</Button>
                            <Button>Flag Counter</Button>
                        </Row>
                    </Grid>

                    <br/>
                    <TileGrid rows={rows} cols={columns} tiles={this.state.currentGame.tile_set}/>
                </div>
            )
        }
    }
}

export default GameBoard;
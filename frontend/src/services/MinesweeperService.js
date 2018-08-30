import axios from 'axios';
import Constants from '../helpers/Constants';

/**
 * This class will act on the business logic of the minesweeper game by acting
 * as an intermediary between the components and the API calls.
 */
class MinesweeperService {

  /**
   * Makes a call to our api (ex. GET /api/v1/difficulties/) to retrieve a list of difficulties
   * and returns them to our caller
   * 
   * @returns Promise<Array> A promise to return an array of difficulties 
   */
  getDifficulties() {
    return axios.get(Constants.DIFFICULTY_ENDPOINT)
      .then((result) => {
        return result.data;
      });
  }

  /**
   * Retrieves the list of all games from our API (ex. GET /api/v1/games) and returns them to
   * the caller
   * 
   * @returns Promise<Array> A promise to return an array of games
   */
  getGames() {
    return axios.get(Constants.GAMES_ENDPOINT)
      .then((result) => {
        return result.data;
      })
  }

  /**
   * Makes a call to our API to get the latest game state as well as all the tiles for the game
   * and returns the results to our caller.
   * 
   * GET /api/v1/game/:id
   * GET /api/v1/tile/?game=:id
   * 
   * @param {int} id of the game that we want to retrieve from our API 
   * @returns Promise<Array> An array where the first element is the current game, and the second
   *                         is the tiles.
   */
  getGame(id) {
    var gamePromise = axios.get(Constants.GAMES_ENDPOINT + id + '/');
    var tilesPromise = axios.get(Constants.TILE_ENDPOINT + '?game=' + id);

    return Promise.all([gamePromise, tilesPromise])
      .then((result) => {
        const currentGame = result[0].data;
        const tiles = result[1].data;

        return [currentGame, tiles];
      });
  }

  /**
   * Makes a call to create a new game (ex: POST /api/v1/game/) and returns the new game
   * to the caller.
   * 
   * @param {int} difficulty The id of the new difficulty for the game
   */
  createGame(difficulty) {
    return axios.post(Constants.GAMES_ENDPOINT, { difficulty: difficulty })
      .then((result) => {
        return result.data;
      })
  }

  /**
   * Makes a call to get the list of games. The first game is the "current game". If no 
   * games are found in the list, then we will create a new game and return the list of games.
   * 
   * @returns Promise<Object> An object containing the game and the tiles of either the current 
   *                          game or a newly created game.
   */
  getCurrentOrCreateNewGame() {
    let game = null;
    let tiles = null;

    return axios.get(Constants.GAMES_ENDPOINT)
      .then((result) => {
        game = result.data[0];

        if (game) {
          // We'll also get the tiles for it
          return this.getTiles(game.id);
        } 
        return null;
      })
      .then((result) => {
        if (result) {
          // If we have data, that means we have an existing game
          tiles = result;
        } else {
          // If we have no data, it means no game exists, we'll start a new one!
          return this.createGame();
        }
      })
      .then((result) => {
        // If there is a result here, it's because we've had to create a new game
        if (result) {
          game = result;
          return this.getTiles(game.id);
        }
      })
      .then((result) => {
        // If there is a result here, it's because we've had to get tiles
        if (result) {
          tiles = result;
        }

        // We're finally done, so we can just return the game and tiles
        return {
          tiles: tiles,
          game: game
        }
      })
  }

  /**
   * Gets all tiles for a particular game by making an API call with a query
   * 
   * GET /api/v1/tile/?game=:id
   * 
   * @param {int} gameId The id of the game whose tiles we're looking for
   */
  getTiles(gameId) {
    return axios.get(Constants.TILE_ENDPOINT + '?game=' + gameId)
      .then((result) => {
        return result.data;
      });
  }

  /**
   * Updates the status of the tile. This is how we handle minesweeper clicks
   * on tiles. This will make a PUT request to the server to update that tile
   * 
   * PUT /api/v1/tile/:id
   * 
   * @param {int} tileId    The id of the tile that we want to update
   * @param {string} status The new status of the tile
   */
  updateTile(tileId, status) {
    return axios.put(Constants.TILE_ENDPOINT + tileId + '/', { status: status })
      .then((result) => {
        return result.data;
      })
  }
}

export default MinesweeperService;
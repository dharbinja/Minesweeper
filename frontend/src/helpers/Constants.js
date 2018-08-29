const API_URL = process.env.API_URL || 'http://localhost:8000/api/v1';

const Constants = {
  API_URL: API_URL,
  GAMES_ENDPOINT: API_URL + '/game/',
  DIFFICULTY_ENDPOINT: API_URL + '/difficulty/',
  TILE_ENDPOINT: API_URL + '/tile/'
}

export default Constants;
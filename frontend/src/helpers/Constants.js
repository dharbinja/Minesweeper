const API_URL = process.env.API_URL || 'http://localhost:8000/api/v1/';
const AUTH_URL = process.env.AUTH_URL || 'http://localhost:8000/auth/';
const CLIENT_SECRET = process.env.CLIENT_SECERT || 'lnREIwCjLIfVk7ICEc6PXwyNV4clTKhaaaeHBApQ1hrNLoVykpNDa4CR3OVdyNDuSD1DWulWNpKxpSOr4jtMalyciyW7nfvg4i21M5UiRkb0rN0Kpr1xaqb1yXXkLosR';

const Constants = {
  // Main game endpoints
  API_URL: API_URL,
  GAMES_ENDPOINT: API_URL + 'game/',
  DIFFICULTY_ENDPOINT: API_URL + 'difficulty/',
  TILE_ENDPOINT: API_URL + 'tile/',

  // Authentication endpoints
  AUTH_URL: AUTH_URL,
  CONVERT_TOKEN_ENDPOINT: AUTH_URL + 'convert-token/',

  // OAuth client id and secret to be able to talk to our server for auth
  CLIENT_ID: 'zdEaSeSi6Y8HSKEGGFE51lOqIMC1QCP7HbnPvjYi',
  CLIENT_SECRET: CLIENT_SECRET,

  // CLIENT IDs for 3rd Party Login
  FACEBOOK_APP_ID: 476772082791895
}

export default Constants;
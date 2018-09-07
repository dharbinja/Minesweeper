import axios from 'axios';
import Constants from '../helpers/Constants';

/**
 * This class will act on the business logic of the minesweeper game by acting
 * as an intermediary between the components and the API calls.
 */
class AuthenticationService {

  /**
   * Makes a call to our auth api (ex. GET /auth/convert_token) to login with a
   * facebook token and return our own 
   * 
   * @returns Promise<Array> A promise to return an array of difficulties 
   */
  signInWithFacebook(facebookResponse) {
    return axios.post(Constants.CONVERT_TOKEN_ENDPOINT, {
        grant_type: 'convert_token',
        client_id: Constants.CLIENT_ID,
        client_secret: Constants.CLIENT_SECRET,
        backend: 'facebook',
        token: facebookResponse.accessToken
      })
      .then((result) => {
        console.log(result);
        return result.data;
      });
  }
}

export default AuthenticationService;
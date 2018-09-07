import React, { Component } from 'react';
import logo from '../../assets/images/minesweeper_logo.png';
import FacebookLogin from 'react-facebook-login';
import Constants from '../../helpers/Constants';
import AuthenticationService from '../../services/AuthenticationService';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticationService: new AuthenticationService()
    }

    this.facebookResponse = this.facebookResponse.bind(this);
  }

  facebookResponse(response) {
    console.log("FACEBOOK!");
    console.log(response);
    this.state.authenticationService.signInWithFacebook(response);
  }

  render() {
    return (
      <div className="text-center">
        <br/>
        <br/>
        <div>
          <img className="logo" src={logo} alt="logo" />
        </div>
        
        <FacebookLogin
          appId={Constants.FACEBOOK_APP_ID}
          autoLoad={false}
          reauthenticate={true}
          fields="name,email,picture"
          callback={this.facebookResponse} />
      </div>
    );
  }
}

export default Login;

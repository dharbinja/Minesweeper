import React from 'react';

class ErrorViewer extends React.Component {
  render() {
    return (
      <div className="text-center">
        <div>There was an error loading the game. Please try again or contact <a href="mailto:dharbinja@yahoo.ca">dharbinja@yahoo.ca</a>.</div>
        < br />
        <div>Fatal Error: {this.props.error.message}</div>
      </div>
    )
  }
}

export default ErrorViewer;
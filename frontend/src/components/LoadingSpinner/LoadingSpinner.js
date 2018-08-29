import React from 'react';
import Spinner from 'react-spinkit';

class LoadingSpinner extends React.Component {
  render() {
    return (
      <div className="spinner-overlay">
        <div className="spinner-content">
          <Spinner name="circle" color="purple" />
          <div className="spinner-text">{this.props.spinnerText || 'Loading Data...'}</div>
        </div>
      </div>
    );
  }
}

export default LoadingSpinner;
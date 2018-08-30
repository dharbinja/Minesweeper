import React from 'react';
import Spinner from 'react-spinkit';
import './LoadingSpinner.css';

class LoadingSpinner extends React.Component {
  render() {
    return (
      <div className="spinner-overlay">
        <div className="spinner-content">
          <Spinner name="circle" color="blue" fadeIn="none"/>
          <div className="spinner-text">{this.props.spinnerText || 'Loading Data...'}</div>
        </div>
      </div>
    );
  }
}

export default LoadingSpinner;
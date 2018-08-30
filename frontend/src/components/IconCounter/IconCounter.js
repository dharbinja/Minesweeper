import React from 'react';
import './IconCounter.css';

class IconCounter extends React.Component {
  render() {
    return (
      <div className="minesweeper-icon-counter">
        <img src={this.props.image} alt="flag" />
        <span>{this.props.text}</span>
      </div>
    )
  }
}

export default IconCounter;
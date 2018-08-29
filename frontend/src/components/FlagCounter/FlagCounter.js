import React from 'react';
import './FlagCounter.css';
import flag from '../../images/flag_no_bg.png';

class FlagCounter extends React.Component {
  render() {
    const flaggedTiles = this.props.tiles.filter(tile => tile.status === 'Flagged');

    return (
      <div className="minesweeper-flag-counter">
        <img src={flag} alt="flag" />
        <span>{flaggedTiles.length}/{this.props.totalMines}</span>
      </div>
    )
  }
}

export default FlagCounter;
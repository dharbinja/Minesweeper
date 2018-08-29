import React from 'react';
import './FlagCounter.css';

class FlagCounter extends React.Component {
  render() {
    const flaggedTiles = this.props.tiles.filter(tile => tile.status === 'Flagged');

    return (
      <span className="minesweeper-flag-counter">{flaggedTiles.length}/{this.props.totalMines}</span>
    )
  }
}

export default FlagCounter;
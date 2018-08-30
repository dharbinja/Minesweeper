import React from 'react';
import './FlagCounter.css';
import flag from '../../images/flag_no_bg.png';
import IconCounter from '../IconCounter/IconCounter';

class FlagCounter extends React.Component {
  render() {
    const flaggedTiles = this.props.tiles.filter(tile => tile.status === 'Flagged');

    return (
      <div className="minesweeper-flag-counter">
        <IconCounter text={flaggedTiles.length} image={flag} />
      </div>
    )
  }
}

export default FlagCounter;
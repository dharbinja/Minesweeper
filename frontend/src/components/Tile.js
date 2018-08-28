import React from 'react';
import { Button } from 'react-bootstrap';

class Tile extends React.Component {
  render() {
    let content = ''
    if (this.props.tile.status === 'Opened') {
      content = this.props.tile.is_mine ? 'B' : this.props.tile.neighbouring_mines;
    } else if (this.props.tile.status === 'Flagged') {
      content = 'F';
    }

    return (
      <Button className="minesweeper-tile">
        {content}
      </Button>
    )
  }
}

export default Tile;
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
      <Button 
        className="minesweeper-tile" 
        onClick={(e) => this.props.onLeftClick(e, this.props.tile)}
        onContextMenu={(e) => this.props.onRightClick(e, this.props.tile)}
        >
        {content}
      </Button>
    )
  }
}

export default Tile;
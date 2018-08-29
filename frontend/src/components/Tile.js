import React from 'react';
import { Button } from 'react-bootstrap';

class Tile extends React.Component {
  constructor(props) {
    super(props);
    
    this.handleRightClick = this.handleRightClick.bind(this);
    this.handleLeftClick = this.handleLeftClick.bind(this);
  }

  canLeftClick() {
    return this.props.tile.status === 'Closed';
  }

  canRightClick() {
    return this.props.tile.status === 'Closed' || this.props.tile.status === 'Flagged';
  }

  handleRightClick(e) {
    this.canRightClick() ? this.props.onRightClick(e, this.props.tile) : e.preventDefault();
  }

  handleLeftClick(e) {
    this.canLeftClick() ? this.props.onLeftClick(e, this.props.tile) : e.preventDefault();
  }

  render() {
    let content = ''
    if (this.props.tile.status === 'Opened') {
      content = this.props.tile.is_mine ? 'B' : this.props.tile.neighbouring_mines;
    } else if (this.props.tile.status === 'Flagged') {
      content = 'F';
    }

    return (
      <Button 
        className={"minesweeper-tile minesweeper-tile-" + this.props.tile.status.toLowerCase()}  
        onClick={(e) => this.handleLeftClick(e)}
        onContextMenu={(e) => this.handleRightClick(e)}
        >
        {content}
      </Button>
    )
  }
}

export default Tile;
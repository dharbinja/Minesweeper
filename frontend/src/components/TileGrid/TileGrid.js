import React from 'react';
import TileRow from '../TileRow/TileRow';
import './TileGrid.css';

class TileGrid extends React.Component {
  render() {
    // Here we generate rows of tiles based on the passed in data
    let tileRows = [];
    for (let i = 0; i < this.props.rows; i++) {
      let newRow = this.props.tiles.filter(tile => tile.row === i);
      tileRows.push(newRow);
    }

    // Each row will render a "Tile Row" component
    const content = tileRows.map((tileRow, index) =>
      <TileRow key={index} row={tileRow} onLeftClick={this.props.onLeftClick} onRightClick={this.props.onRightClick}/>
    )

    return (
      <div className="minesweeper-grid">
        {content}
      </div>
    )
  }
}

export default TileGrid;
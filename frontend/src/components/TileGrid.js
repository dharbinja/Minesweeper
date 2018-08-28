import React from 'react';
import TileRow from './TileRow'

class TileGrid extends React.Component {
  render() {
    let tileRows = [];
    for (let i = 0; i < this.props.rows; i++) {
      let newRow = this.props.tiles.filter(tile => tile.row === i);
      tileRows.push(newRow);
    }

    const content = tileRows.map((tileRow, index) =>
      <TileRow key={index} row={tileRow} />
    )

    return (
      <div className="minesweeper-grid">
        {content}
      </div>
    )
  }
}

export default TileGrid;
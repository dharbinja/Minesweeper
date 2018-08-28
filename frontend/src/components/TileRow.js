import React from 'react';
import Tile from './Tile'

class TileRow extends React.Component {
  render() {
    const content = this.props.row.map((tile) =>
      <Tile tile={tile} key={tile.id} />
    )

    return (
      <div>
        {content}
      </div>
    )
  }
}

export default TileRow;
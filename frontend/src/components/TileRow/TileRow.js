import React from 'react';
import Tile from '../Tile/Tile'

class TileRow extends React.Component {
  render() {
    const content = this.props.row.map((tile) =>
      <Tile tile={tile} key={tile.id} onLeftClick={this.props.onLeftClick} onRightClick={this.props.onRightClick} />
    )

    return (
      <div>
        {content}
      </div>
    )
  }
}

export default TileRow;
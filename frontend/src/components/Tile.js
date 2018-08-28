import React from 'react';
import { Button } from 'react-bootstrap';

class Tile extends React.Component {
    render() {
        return (
            <Button className="minesweeper-tile">
                {this.props.tile.id}
            </Button>
        )
    }
}

export default Tile;
import React from 'react';
import { Row } from 'react-bootstrap';
import Tile from './Tile'

class FlagCounter extends React.Component {
    render() {
        const flaggedTiles = this.props.tiles.filter(tile => tile.status === 'Flagged');

        return (
            <span className="minesweeper-flag-counter">Flagged {flaggedTiles.length} / {this.props.totalMines}</span>
        )
    }
}

export default FlagCounter;
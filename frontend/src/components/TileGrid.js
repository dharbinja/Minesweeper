import React from 'react';
import { Grid } from 'react-bootstrap';
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
            <Grid className="minesweeper-grid">
                {content}
            </Grid>
        )
    }
}

export default TileGrid;
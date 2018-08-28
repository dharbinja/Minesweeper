import React from 'react';
import { Row } from 'react-bootstrap';
import Tile from './Tile'

class TileRow extends React.Component {
    render() {
        const content = this.props.row.map((tile) => 
            <Tile tile={tile} key={tile.id} />
        )

        return (
            <Row>
                {content}
            </Row>
        )
    }
}

export default TileRow;
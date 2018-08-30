import React from 'react';
import { Button } from 'react-bootstrap';
import './Tile.css';
import flagImg from '../../assets/images/flag.png';
import nonExplodedBomb from '../../assets/images/non_exploded_bomb.png';
import explodedBomb from '../../assets/images/exploded_bomb.jpg';
import wrongBomb from '../../assets/images/wrong_bomb.png';

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
      content = this.props.tile.is_mine ?
        (
          <img
            src={this.props.tile.is_exploded_mine ? explodedBomb : nonExplodedBomb}
            alt="bomb"
            className="minesweeper-tile-image" />
        ) :
        (
          <span className={"minesweeper-number minesweeper-number-" + this.props.tile.neighbouring_mines}>
            {this.props.tile.neighbouring_mines}
          </span>
        );
    } else if (this.props.tile.status === 'Flagged') {
      content = (
        <img
          src={this.props.tile.wrongly_flagged ? wrongBomb : flagImg}
          alt="flag"
          className="minesweeper-tile-image" />
      );
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
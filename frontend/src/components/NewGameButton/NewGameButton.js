import React from 'react';
import { Button } from 'react-bootstrap';
import smiley from '../../images/smiley.png';
import winSmiley from '../../images/win_smiley.png';
import lossSmiley from '../../images/lose_smiley.png';
import './NewGameButton.css';

class NewGameButton extends React.Component {
  render() {
    // Select the right smiley face image based on game result
    let smileyImg = smiley;
    if (this.props.result === 'Loss') {
      smileyImg = lossSmiley;
    } else if (this.props.result === 'Win') {
      smileyImg = winSmiley
    }

    // Render an image button to represent the New Game Button
    return (
      <Button
        bsSize="xsmall"
        className="minesweeper-new-game-button"
        disabled={this.props.isStartingNewGame}
        onClick={!this.props.isStartingNewGame ? this.props.onClick : null}
      >
        <img src={smileyImg} alt="New Game Button" />
      </Button>
    )
  }
}

export default NewGameButton;
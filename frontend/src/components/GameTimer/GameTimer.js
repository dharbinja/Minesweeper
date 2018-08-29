import React from 'react';
import './GameTimer.css';
import clock from '../../images/clock.png';

const MAX_TIME_ELAPSED = 999;

class GameTimer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      secondsElapsed: 0
    }
  }

  componentWillUnmount() {
    if (this.timerID) {
      clearInterval(this.timerID);
    }
  }

  tick() {
    const secondsDifference =
      this.calculateDifferenceInSeconds(new Date(this.props.timeStarted), Date.now());

    this.setState({
      secondsElapsed: Math.min(secondsDifference, MAX_TIME_ELAPSED)
    });
  }

  calculateDifferenceInSeconds(startTime, endTime) {
    var difference = endTime - startTime;
    var secondsDifference = Math.round(difference / 1000);
    return Math.abs(secondsDifference);
  }

  render() {
    let secondsDifference = this.state.secondsElapsed;
    if (this.props.timeEnded) {
      // Game is over, display the duration in seconds
      const timeStart = new Date(this.props.timeStarted);
      const timeEnd = new Date(this.props.timeEnded);
      secondsDifference = this.calculateDifferenceInSeconds(timeStart, timeEnd);
    } else {
      // Game is still going, let's keep the timer going
      this.timerID = setInterval(
        () => this.tick(),
        1000
      );
    }

    return (
      <div className="minesweeper-timer">
        <img src={clock} alt="clock" width="20" />
        <span>{secondsDifference}</span>
      </div>
    )
  }
}

export default GameTimer;
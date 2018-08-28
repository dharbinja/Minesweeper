import React from 'react';

const MAX_TIME_ELAPSED = 999;

class GameTimer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      secondsElapsed: 0
    }
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    var difference = Date.now() - new Date(this.props.timeStarted);
    var secondsDifference = Math.round(difference / 1000);

    this.setState({
      secondsElapsed: Math.min(secondsDifference, MAX_TIME_ELAPSED)
    });
  }

  render() {
    return (
      <span className="minesweeper-timer">{this.state.secondsElapsed}</span>
    )
  }
}

export default GameTimer;
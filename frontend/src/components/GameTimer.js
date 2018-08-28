import React from 'react';

class GameTimer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            secondsElapsed: 0 
        }
    }

    componentDidMount() {
        var difference = Date.now() - new Date(this.props.timeStarted);
        var secondsDifference = Math.round(difference / 1000);

        this.setState({
            secondsElapsed: secondsDifference
        })

        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            secondsElapsed: Math.min(this.state.secondsElapsed + 1, 999)
        })
    }

    render() {
        return (
            <span>{this.state.secondsElapsed}</span>
        )
    }
}

export default GameTimer;
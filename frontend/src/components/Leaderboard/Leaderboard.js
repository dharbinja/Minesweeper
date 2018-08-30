import React from 'react';
import { ListGroup } from 'react-bootstrap';
import ErrorViewer from '../ErrorViewer/ErrorViewer';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      error: null,
      games: []
    }
  }

  componentDidMount() {
    this.props.minesweeperService.getGames()
      .then((result) => {
        // Filter and sort the games
        let games = result.filter(game => game.time_ended !== null);
        //games = games.sort

        //TODO: Pick up here

        this.setState({
          games: result,
          isLoading: false
        });
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
          error
        })
      });
  }

  render() {
    const { error, isLoading, games } = this.state;
    if (error) {
      return (
        <ErrorViewer error={error} />
      );
    } else if (isLoading) {
      return (
        <LoadingSpinner spinnerText="Loading Leaderboard..." />
      );
    } else {


      return (
        <div className="text-center">
          <ListGroup>
            TODO: Generate list of items
          </ListGroup>
        </div>
      );
    }
  }
}

export default Leaderboard;
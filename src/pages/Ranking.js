import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import RankCard from '../components/RankCard';

class Ranking extends Component {
  state = {
    ranking: [],
  };

  componentDidMount() {
    const newRanking = JSON.parse(localStorage.getItem('ranking'));
    if (newRanking === null) {
      this.setState({
        ranking: [],
      });
    } else if (newRanking.length > 0) {
      this.setState({
        ranking: newRanking,
      });
    }
  }

  render() {
    const {
      state: {
        ranking,
      } } = this;

    return (
      <div>
        <h1
          data-testid="ranking-title"
        >
          Ranking
        </h1>
        <ol>
          {
            ranking.length > 0
              ? (
                ranking
                  .map((each, index) => (
                    <RankCard
                      key={ `${each.name}${index}` }
                      nameTestId={ `player-name-${index}` }
                      scoreTestId={ `player-score-${index}` }
                      rank={ each }
                    />
                  ))
              )
              : (
                <p>Loading...</p>
              )
          }
        </ol>
        <Link to="/">
          <Button
            testId="btn-go-home"
            btnLabel="Inicio"
          />
        </Link>
      </div>
    );
  }
}

export default Ranking;

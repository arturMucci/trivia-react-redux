import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RankCard extends Component {
  render() {
    const {
      rank: {
        name,
        score,
        gravatar,
      },
      nameTestId,
      scoreTestId,
    } = this.props;

    return (
      <li>
        <p
          data-testid={ nameTestId }
        >
          {name}
        </p>
        <p
          data-testid={ scoreTestId }
        >
          {score}
        </p>
        <img
          src={ `${gravatar}` }
          alt={ `${name}'s foto` }
        />
      </li>
    );
  }
}

RankCard.propTypes = {
  nameTestId: PropTypes.string.isRequired,
  scoreTestId: PropTypes.string.isRequired,
  rank: PropTypes.shape({
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    gravatar: PropTypes.string.isRequired,
  }).isRequired,
};

export default RankCard;

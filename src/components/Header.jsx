import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { player: { name, score }, gravatar } = this.props;
    return (
      <div>
        <img
          src={ gravatar }
          alt="Profile"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{ score }</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

Header.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string,
    score: PropTypes.number,
  }),
  gravatar: PropTypes.string,
};

Header.defaultProps = {
  player: {
    name: '',
    score: 0,
  },
  gravatar: '',
};

export default connect(mapStateToProps)(Header);

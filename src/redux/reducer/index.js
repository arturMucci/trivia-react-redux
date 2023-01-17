import {
  LOGIN_SAVED,
  INCREMENT_SCORE,
  SAVE_GRAVATAR,
  RESET_PLAYER,
} from '../actions';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
};

const rootReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_GRAVATAR:
    return {
      ...state,
      gravatar: action.payload,

    };
  case LOGIN_SAVED:
    return {
      ...state,
      player: {
        ...state.player,
        ...action.payload,
      },
    };
  case INCREMENT_SCORE:
    return {
      ...state,
      player: {
        ...state.player,
        score: state.player.score + action.payload,
        assertions: state.player.assertions + 1,
      },
    };
  case RESET_PLAYER:
    return {
      ...state,
      player: INITIAL_STATE.player,
    };
  default:
    return state;
  }
};

export default rootReducer;

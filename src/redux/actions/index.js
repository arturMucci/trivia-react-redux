export const LOGIN_SAVED = 'LOGIN_SAVED';
export const ACTION_LOGIN_SAVED = (payload) => ({
  type: LOGIN_SAVED,
  payload,
});

export const INCREMENT_SCORE = 'INCREMENT_SCORE';
export const ACTION_INCREMENT_SCORE = (dispatch, payload) => {
  dispatch({
    type: INCREMENT_SCORE,
    payload,
  });
};

export const SAVE_GRAVATAR = 'SAVE_GRAVATAR';
export const ACTION_SAVE_GRAVATAR = (dispatch, payload) => {
  dispatch({
    type: SAVE_GRAVATAR,
    payload,
  });
};

export const RESET_PLAYER = 'RESET_PLAYER';
export const ACTION_RESET_PLAYER = (dispatch) => {
  dispatch({ type: RESET_PLAYER });
};

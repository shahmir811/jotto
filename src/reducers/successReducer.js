import { actionTypes } from "../actions";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = false, action) => {
  switch (action.type) {
    case actionTypes.CORRECT_GUESS:
      return true;
    default:
      return state;
  }
};

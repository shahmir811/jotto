import { actionTypes } from '../actions';

const store = (state = false, action) => {
	const { type } = action;

	switch (type) {
		case actionTypes.CORRECT_GUESS:
			return true;

		default:
			return state;
	}
};

export default store;

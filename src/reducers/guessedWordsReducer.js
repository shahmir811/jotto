import { actionTypes } from '../actions';

export default (state = [], action) => {
	const { type, payload } = action;

	switch (type) {
		case actionTypes.GUESS_WORD:
			return [...state, action.payload];

		default:
			return state;
	}
};

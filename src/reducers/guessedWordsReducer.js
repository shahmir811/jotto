import { actionsTypes } from '../actions';

export default (state = [], action) => {
	const { type, payload } = action;

	switch (type) {
		case actionsTypes.GUESS_WORD:
			return [...state, action.payload];

		default:
			return state;
	}
};

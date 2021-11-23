import { actionTypes } from '../../actions';
import successReducer from '../successReducer';

test('when previous state is undefined, return false', () => {
	const newState = successReducer(undefined, {});
	expect(newState).toBe(false);
});

test('returns previous state when unknown action type', () => {
	const newState = successReducer(false, { type: 'TRY_NEW' });
	expect(newState).toBe(false);
});

test('returns `true` for actions type `CORRECT_GUESS`', () => {
	const newState = successReducer(false, { type: actionTypes.CORRECT_GUESS });
	expect(newState).toBe(true);
});

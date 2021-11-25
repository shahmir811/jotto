import moxios from 'moxios';

import { getSecretWord } from '../index';
import { storeFactory } from '../../../tests/testUtils';

// describe('correctGuess', () => {
// 	test('returns an action with type `CORRECT_GUESS`', () => {
// 		const action = correctGuess();
// 		expect(action).toStrictEqual({
// 			type: actionTypes.CORRECT_GUESS,
// 		});
// 	});
// });

describe('getSecretWord', () => {
	beforeEach(() => {
		moxios.install();
	});

	afterEach(() => {
		moxios.uninstall();
	});

	test('secret word is returned', () => {
		const store = storeFactory();
		moxios.wait(() => {
			const request = moxios.requests.mostRecent();
			request.respondWith({
				status: 200,
				response: 'party',
			});
		});

		// TODO: Update to test app in redux / context section

		return store.dispatch(getSecretWord()).then(() => {
			const secretWord = store.getState().secretWord;
			expect(secretWord).toBe('party');
		});
	});
});

import { storeFactory } from '../tests/testUtils';
import { guessWord } from './actions';

describe.skip('guessWord action dispatcher', () => {
	const secretWord = 'party';
	const unsuccessfulGuess = 'train';

	describe('no guessed words', () => {
		let store;
		const initialState = { secretWord };

		beforeEach(() => {
			store = storeFactory(initialState);
		});

		test('updates states correctly after unsuccessful guess', () => {
			store.dispatch(guessWord(unsuccessfulGuess));
			const newState = store.getState();
			const expectedState = {
				...initialState,
				success: false,
				guessedWords: [
					{
						guessedWord: unsuccessfulGuess,
						letterMatchCount: 3,
					},
				],
			};

			expect(newState).toEqual(expectedState);
		});

		test('updates states correctly after successful guess', () => {
			store.dispatch(guessWord(secretWord));
			const newState = store.getState();

			const expectedState = {
				...initialState,
				sucess: true,
				guessedWords: [{ guessedWord: secretWord, letterMatchCount: 5 }],
			};

			expect(newState).toEqual(expectedState);
		});
	});

	describe('some guessed words', () => {
		const guessedWords = [{ guessedWord: 'agile', letterMatchCount: 1 }];
		const initialState = {
			guessedWords,
			secretWord,
		};
		let store;

		beforeEach(() => {
			store = storeFactory(initialState);
		});

		test('updates states correctly after unsuccessful guess', () => {
			store.dispatch(guessWord(unsuccessfulGuess));
			const newState = store.getState();
			const expectedState = {
				secretWord,
				success: false,
				guessedWords: [
					...guessedWords,
					{ guessedWord: unsuccessfulGuess, letterMatchCount: 3 },
				],
			};

			expect(newState).toBe(expectedState);
		});

		test('updates states correctly after successful guess', () => {
			store.dispatch(guessWord(secretWord));
			const newState = store.getState();
			const expectedState = {
				secretWord,
				success: true,
				guessedWords: [
					...guessedWords,
					{ guessedWord: secretWord, letterMatchCount: 5 },
				],
			};
			expect(newState).toBe(expectedState);
		});
	});
});

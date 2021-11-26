import { storeFactory } from "../tests/testUtils";
import { guessWord } from "./actions";

describe("guessWord action dispatcher", () => {
  const secretWord = "party";
  const unsuccessfulGuess = "train";

  describe("no guessed words", () => {
    let store;
    const initialState = { secretWord };

    beforeEach(() => {
      store = storeFactory(initialState);
    });

    test("updates states correctly after unsuccessful guess", () => {
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

    test("updates states correctly after successful guess", () => {
      store.dispatch(guessWord(secretWord));
      const newState = store.getState();

      const expectedState = {
        ...initialState,
        // 2021-11-26 bds
        // the test output shows:
        // -   "sucess": true,
        // +   "success": true,
        // indicates misspelling in the "success" property, which I fixed
        success: true,
        guessedWords: [{ guessedWord: secretWord, letterMatchCount: 5 }],
      };

      expect(newState).toEqual(expectedState);
    });
  });

  describe("some guessed words", () => {
    const guessedWords = [{ guessedWord: "agile", letterMatchCount: 1 }];
    const initialState = {
      guessedWords,
      secretWord,
    };
    let store;

    beforeEach(() => {
      store = storeFactory(initialState);
    });

    test("updates states correctly after unsuccessful guess", () => {
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

      // 2021-11-26 bds
      // from test output:
      //     If it should pass with deep equality, replace "toBe" with "toStrictEqual"
      // replaced as the test output suggested
      expect(newState).toStrictEqual(expectedState);
    });

    test("updates states correctly after successful guess", () => {
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
      // 2021-11-26 bds
      // from test output:
      //     If it should pass with deep equality, replace "toBe" with "toStrictEqual"
      // replaced as the test output suggested
      expect(newState).toStrictEqual(expectedState);
    });
  });
});

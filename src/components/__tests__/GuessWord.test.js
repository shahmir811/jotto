import { mount } from "enzyme";
import { Provider } from "react-redux";

import App from "../../App";
import { findByTestAttr, storeFactory } from "../../../tests/testUtils";

// activate global mock to make sure getSecretWord doesn't make network call
jest.mock("../../actions");

const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  const wrapper = mount(
    <Provider store={store}>
      <App />
    </Provider>
  );

  // Add value to input field
  const inputBox = findByTestAttr(wrapper, "input-box");
  inputBox.simulate("change", { target: { value: "train" } });

  // simulate click on submit button
  const submitButton = findByTestAttr(wrapper, "submit-button");
  submitButton.simulate("click", { preventDefault() {} });

  return wrapper;
};

describe("no word guessed", () => {
  let wrapper;

  beforeEach(() => {
    const initialState = {
      secretWord: "party",
      success: false,
      guessedWords: [],
    };

    wrapper = setup(initialState);
  });

  test("creates GuessedWords table with one row", () => {
    // console.log(wrapper.debug());  // 2021-11-26 bds: printed out the wrapper to examine
    // found that the data-test ids were guessed-word, not guessed-words. Updated
    // the second findByTestAttr accordingly.
    const guessedWordsRow = findByTestAttr(wrapper, "guessed-word");
    expect(guessedWordsRow).toHaveLength(1);
  });
});

describe("some words guessed", () => {
  let wrapper;
  beforeEach(() => {
    const initialState = {
      secretWord: "party",
      success: false,
      guessedWords: [{ guessedWord: "agile", letterMatchCount: 1 }],
    };

    wrapper = setup(initialState);
  });

  test("GuessedWords table have more than one row", () => {
    const guessedWordsRow = findByTestAttr(wrapper, "guessed-word");
    // console.log(wrapper.debug());  // 2021-11-26 bds: printed out the wrapper to examine
    // found that the data-test ids were guessed-word, not guessed-words. Updated
    // the second findByTestAttr accordingly.
    expect(guessedWordsRow).toHaveLength(2);
  });
});

describe("guess secret words", () => {
  let wrapper;

  beforeEach(() => {
    const initialState = {
      secretWord: "party",
      success: false,
      guessedWords: [{ guessedWord: "agile", letterMatchCount: 1 }],
    };

    wrapper = setup(initialState);

    // Add value to input field
    const inputBox = findByTestAttr(wrapper, "input-box");
    const mockEvent = { target: { value: "party" } };
    inputBox.simulate("change", mockEvent);

    // simulate click on submit button
    const submitButton = findByTestAttr(wrapper, "submit-button");
    submitButton.simulate("click", { preventDefault() {} });
  });

  test("add rows to GuessedWords Table", () => {
    // console.log(wrapper.debug());  // 2021-11-26 bds: printed out the wrapper to examine
    // found that the data-test ids were guessed-word, not guessed-words. Updated
    // the second findByTestAttr accordingly.
    const guessedWordsRow = findByTestAttr(wrapper, "guessed-word");
    expect(guessedWordsRow).toHaveLength(3);
  });

  test("it displays congrats component", () => {
    // console.log(wrapper.debug()); // 2021-11-26 bds: printed out the wrapper to examine
    // the congrats component did not have any text, because the success prop was false:
    // <Congrats success={false}>
    //   <div data-test="component-congrats" />
    // </Congrats>
    // fixed hard-coded false prop value in App.js
    const congrats = findByTestAttr(wrapper, "component-congrats");
    expect(congrats.text().length).toBeGreaterThan(0);
  });

  test("does not display input component content", () => {
    const inputBox = findByTestAttr(wrapper, "input-box");
    expect(inputBox.exists()).toBe(false);

    const submitButton = findByTestAttr(wrapper, "submit-button");
    expect(submitButton.exists()).toBe(false);
  });
});

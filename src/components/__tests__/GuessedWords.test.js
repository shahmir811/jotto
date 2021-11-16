import { shallow } from 'enzyme';

import GuessedWords from '../GuessedWords';
import { findByTestAttr } from '../../../tests/testUtils';

const defaultProps = {
	guessedWords: [{ guessedWord: 'train', letterMatchCount: 3 }],
};

const setup = (props = {}) => {
	const setupProps = { ...defaultProps, ...props };
	return shallow(<GuessedWords {...setupProps} />);
};

describe('if there are no words guessed', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = setup({ guessedWords: [] });
	});

	test('renders without errors', () => {
		const component = findByTestAttr(wrapper, 'component-guessed-words');
		expect(component.length).toBe(1);
	});

	test('renders instructions to guess a word', () => {
		const instructions = findByTestAttr(wrapper, 'guessed-instructions');
		expect(instructions.text().length).not.toBe(0);
	});
});

describe('if we have guessed words', () => {
	let wrapper;

	const guessedWords = [
		{ guessedWord: 'train', letterMatchCount: 3 },
		{ guessedWord: 'agile', letterMatchCount: 1 },
		{ guessedWord: 'party', letterMatchCount: 5 },
	];

	beforeEach(() => {
		wrapper = setup({ guessedWords });
	});

	test('renders without error', () => {
		const component = findByTestAttr(wrapper, 'component-guessed-words');
		expect(component.length).toBe(1);
	});

	test('renders "guessed words" section', () => {
		const guessedWordsNode = findByTestAttr(wrapper, 'guessed-words');
		expect(guessedWordsNode.length).toBe(1);
	});

	test('correct numbers of words guessed', () => {
		const guessedWordsNodes = findByTestAttr(wrapper, 'guessed-word');
		expect(guessedWordsNodes.length).toBe(guessedWords.length);
	});
});

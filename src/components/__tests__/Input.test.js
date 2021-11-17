import React from 'react';
import { shallow } from 'enzyme';

import Input from '../Input';
import { findByTestAttr } from '../../../tests/testUtils';

const setup = (success = false, secretWord = '') => {
	return shallow(<Input success={success} secretWord={secretWord} />);
};

describe('renders', () => {
	/////////////////////////////////////////
	describe('success is true', () => {
		let wrapper;

		beforeEach(() => {
			wrapper = setup(true);
		});

		it('renders input component without error', () => {
			const component = findByTestAttr(wrapper, 'component-input');
			expect(component.length).toBe(1);
		});

		it('input box does not show', () => {
			const inputBox = findByTestAttr(wrapper, 'input-box');
			expect(inputBox.exists()).toBe(false);
		});

		it('test button does not show', () => {
			const submitButton = findByTestAttr(wrapper, 'submit-button');
			expect(submitButton.exists()).toBe(false);
		});
	});

	/////////////////////////////////////////
	describe('success is false', () => {
		let wrapper;

		beforeEach(() => {
			wrapper = setup(false);
		});

		it('renders input component without error', () => {
			const component = findByTestAttr(wrapper, 'component-input');
			expect(component.length).toBe(1);
		});

		it('input box show', () => {
			const inputBox = findByTestAttr(wrapper, 'input-box');
			expect(inputBox.exists()).toBe(true);
		});

		it('test button show', () => {
			const submitButton = findByTestAttr(wrapper, 'submit-button');
			expect(submitButton.exists()).toBe(true);
		});
	});
});

describe('state controlled input field', () => {
	let wrapper;
	let mockSetCurrentGuess = jest.fn();
	let originalUseState;

	beforeEach(() => {
		mockSetCurrentGuess.mockClear();
		originalUseState = React.useState;
		React.useState = jest.fn(() => ['', mockSetCurrentGuess]); // mock useState

		wrapper = setup();
	});

	afterEach(() => {
		React.useState = originalUseState;
	});

	test('state updates with a value of input box upon change', () => {
		const inputBox = findByTestAttr(wrapper, 'input-box');

		// Following code with run onChange method on input field
		const mockEvent = { target: { value: 'train' } };
		inputBox.simulate('change', mockEvent);

		expect(mockSetCurrentGuess).toHaveBeenCalledWith('train');
	});

	test('field is cleared upon submit button is clicked', () => {
		const submitButton = findByTestAttr(wrapper, 'submit-button');

		submitButton.simulate('click', { preventDefault() {} });
		expect(mockSetCurrentGuess).toHaveBeenCalledWith('');
	});
});

import React from 'react';

const Input = ({ success, secretWord }) => {
	const [currentGuess, setCurrentGuess] = React.useState('');

	if (success) {
		return <div data-test='component-input' />;
	}

	return (
		<div data-test='component-input'>
			<form className='form-inline'>
				<input
					type='text'
					data-test='input-box'
					className='mb-s mx-sm-3'
					placeholder='Enter guess'
					value={currentGuess}
					onChange={e => setCurrentGuess(e.target.value)}
				/>
				<button
					className='btn btn-primary mb-2'
					type='submit'
					data-test='submit-button'
					onClick={e => {
						e.preventDefault();
						// TODO: Update guessedWords
						// TODO: Check against secretWord and update success if needed
						setCurrentGuess('');
					}}>
					Submit
				</button>
			</form>
		</div>
	);
};

export default Input;

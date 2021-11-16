import React from 'react';

const Congrats = ({ success }) => {
	if (success) {
		return (
			<div data-test='component-congrats' className='alert alert-success'>
				<span data-test='congrats-message'>
					Congragulations! You guessed the word.
				</span>
			</div>
		);
	} else {
		return <div data-test='component-congrats' />;
	}
};

export default Congrats;

import React, { useEffect } from 'react';

import './App.css';

import Congrats from './components/Congrats';
import GuessedWords from './components/GuessedWords';
import Input from './components/Input';

import { getSecretWord } from './actions';

const App = () => {
	// TODO: Get props from shared state

	const success = false;
	const secretWord = 'party';
	const guessedWords = [];

	useEffect(() => {
		getSecretWord();
	}, []);

	return (
		<div data-test='component-app' className='container'>
			<h1>Jotto</h1>
			<Congrats success={false} />
			<Input success={success} secretWord={secretWord} />
			<GuessedWords guessedWords={guessedWords} />
		</div>
	);
};

export default App;

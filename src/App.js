import React from 'react';

import './App.css';

import Congrats from './components/Congrats';
import GuessedWords from './components/GuessedWords';

const App = () => {
	return (
		<div className='container'>
			<h1>Jotto</h1>
			<Congrats success={false} />
			<GuessedWords
				guessedWords={[{ guessedWords: 'train', letterMatchCount: 3 }]}
			/>
		</div>
	);
};

export default App;

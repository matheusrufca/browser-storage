import React, { FC } from 'react';
import './App.scss';
import WebSql from './WebSql';

const App: FC = () => {
	return (
		<div className="App container">
			<WebSql />
		</div>
	);
}

export default App;

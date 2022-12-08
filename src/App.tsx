import React, { FC } from 'react'
import { BrowserRouter } from "react-router-dom"
import PageRoutes from './PageRoutes'
import './App.scss'

const App: FC = () => {
	return (
		<BrowserRouter>
			<PageRoutes />
		</BrowserRouter>
	);
}

export default App;


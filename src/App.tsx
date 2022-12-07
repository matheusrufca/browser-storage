import React, { FC } from 'react'
import { BrowserRouter } from "react-router-dom"
import './App.scss'
import PageRoutes from './PageRoutes'

const App: FC = () => {
	return (
		<BrowserRouter>
			<PageRoutes />
		</BrowserRouter>
	);
}

export default App;


import React, { FC } from 'react'
import { BrowserRouter } from "react-router-dom"
import PageRoutes from './PageRoutes'
import './App.scss'

const App: FC = () => {
	return (
		<BrowserRouter basename={process.env.PUBLIC_URL}>
			<PageRoutes />
		</BrowserRouter>
	);
}

export default App;


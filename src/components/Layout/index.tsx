
import React, { FC } from 'react';
import { Outlet } from "react-router-dom"
import PageHeader from '../PageHeader';

const Layout: FC = () => {
	return (
		<>
			<header className='container'>
				<PageHeader />
			</header>
			<main className='container'>
				<Outlet />
			</main>
		</>
	);
}

export default Layout;





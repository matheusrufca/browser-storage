
import React, { FC } from 'react';
import { Link } from "react-router-dom"

const PageHeader: FC = () => {
	return (
		<header className="navbar sticky-top">
			<nav className="container bd-gutter flex-wrap" aria-label="Main navigation">
				<div className="d-flex">
					<ul className="navbar-nav flex-row flex-wrap bd-navbar-nav">
						<li className="nav-item col-6 col-lg-auto">
							<Link className="nav-link py-2 px-0 px-lg-2 active" to='/indexeddb'>IndexedDB</Link>
						</li>

						<li className="nav-item col-6 col-lg-auto">
							<Link className="nav-link py-2 px-0 px-lg-2" to="/websql">WebSQL</Link>
						</li>
					</ul>
				</div>
			</nav>
		</header>
	);
}

export default PageHeader;





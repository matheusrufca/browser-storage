import React, { FC } from 'react'
import { Link } from "react-router-dom"

export const PageNotFound: FC = () => {
	return (
		<div>
			<h2>Nothing to see here!</h2>
			<p>
				<Link to="/">Go to the home page</Link>
			</p>
		</div>
	)
}

export default PageNotFound
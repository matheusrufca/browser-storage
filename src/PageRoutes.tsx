import React, { FC } from 'react'
import { Routes, Route } from "react-router-dom"
import Layout from './components/Layout'
import PageNotFound from './components/PageNotFound'
import { IndexedDb } from './pages/IndexedDb'
import { WebSql } from './pages/WebSql'

export const PageRoutes: FC = () => {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<IndexedDb />} />

				<Route path="indexeddb" element={<IndexedDb />} />

				<Route path="websql" element={<WebSql />} />

				<Route path="*" element={<PageNotFound />} />
			</Route>
		</Routes>
	)
}

export default PageRoutes
import React, { ChangeEvent, FormEvent, memo, useCallback, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import useUsers from './useUsers'
import { Users } from '../../components/Users'
import { useExecuteSql } from '../../shared/websql/useExecuteSql'

export const WebSql = memo(() => {
	const { executeSql } = useExecuteSql()
	const userStore = useUsers()

	const [sqlStatement, setSqlStatement] = useState('CREATE TABLE logs(message, type, timestamp)')

	const handleSubmitSqlStatement = useCallback((event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		executeSql(
			sqlStatement,
			[],
			(transaction) => {
				console.debug('Table created', { createTableStatement: sqlStatement, transaction })
			},
			(transaction, error) => {
				console.debug('Create table error', { createTableStatement: sqlStatement, transaction }, error)
				return true
			}
		)
	}, [executeSql, sqlStatement])

	const handleSqlStatementChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		setSqlStatement(event.target.value)
	}, [])

	return (
		<section>
			<header>
				<h1>WebSQL</h1>
			</header>

			<main className='py-4'>
				<div className='mb-3'>
					<Form onSubmit={handleSubmitSqlStatement} >
						<Row className="align-items-center">
							<Col xs="9">
								<Form.Control
									value={sqlStatement}
									onChange={handleSqlStatementChange}
								/>
							</Col>
		
							<Col xs="auto">
								<Button variant="primary" type="submit">
									Execute SQL
								</Button>
							</Col>
						</Row>
					</Form>
				</div>

				<hr />

				<div className='mb-3'>
					<Users
						data={userStore.data}
						onAdd={userStore.add}
						onEdit={userStore.edit}
						onRemove={userStore.remove}
					/>
				</div>
			</main>
		</section >
	)
})

export default WebSql

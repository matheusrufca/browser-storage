import React, { ChangeEvent, FormEvent, memo, useCallback, useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FormAddUser, UsersList } from '../../components/Users'
import { useUsersTable } from '../../shared/websql'
import { useExecuteSql } from '../../shared/websql/useExecuteSql'
import { TUser } from '../../types'

export const WebSql = memo(() => {
	const { executeSql } = useExecuteSql()
	const { addUser, getAllUsers, updateUser, removeUser } = useUsersTable()

	const [sqlStatement, setSqlStatement] = useState('CREATE TABLE logs(message, type, timestamp)')

	const [users, setUsers] = useState<TUser[]>([])

	const loadUsers = useCallback(async () => {
		const users = await getAllUsers()
		setUsers(users)
	}, [getAllUsers])

	const handleSubmitSqlStatement = (event: FormEvent<HTMLFormElement>) => {
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
	}

	const handleSqlStatementChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSqlStatement(event.target.value)
	}

	const handleSubmitUser = (user: TUser) => {
		addUser(user)
		loadUsers()
	}

	const handleEditUser = (user: TUser) => {
		updateUser(user)
		loadUsers()
	}

	const handleRemoveUser = (user: TUser) => {
		removeUser(user)
		loadUsers()
	}

	useEffect(() => {
		loadUsers()
	}, [loadUsers])

	return (
		<div className="App container">
			<Form onSubmit={handleSubmitSqlStatement} className='mb-3'>
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

			<div className='mb-3'>
				<FormAddUser onSubmit={handleSubmitUser} />
			</div>

			<UsersList
				users={users}
				onEdit={handleEditUser}
				onRemove={handleRemoveUser}
			/>			
		</div>
	)
})

export default WebSql

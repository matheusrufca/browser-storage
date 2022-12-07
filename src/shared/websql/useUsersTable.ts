
import { useCallback, useEffect } from 'react'
import { TUser } from '../../types'
import { useExecuteSql } from './useExecuteSql'
import { useLogsTable } from './useLogsTable'

const CREATE_TABLE_STATEMENT = 'CREATE TABLE IF NOT EXISTS users(username type unique, email type unique, name)'

export const useUsersTable = () => {
	const { executeSql } = useExecuteSql()
	const { log } = useLogsTable()

	const createTable = useCallback(() => {
		executeSql(CREATE_TABLE_STATEMENT, undefined, () => {
			console.debug('Users table created')
		})
	}, [executeSql])


	const add = ({ username, email, name }: TUser) => {
		const values = [username, email, name]
		const sqlStatement = `INSERT INTO users(username, email, name) VALUES(?,?,?)`

		const handleSuccess: SQLStatementCallback = () => {
			log({
				message: 'User created',
				statement: sqlStatement,
				type: 'info'
			})
		}

		const handleError: SQLStatementErrorCallback = (_, error) => {
			log({
				message: 'Create user error',
				statement: sqlStatement,
				type: 'error',
				error,
			})
			return true
		}

		executeSql(sqlStatement, values, handleSuccess, handleError)
	}

	const update = ({ username, email, name }: TUser) => {
		const values = [username, email, name, username]
		const sqlStatement = `UPDATE users SET username=?, email=?, name=? WHERE username=?`

		const handleSuccess: SQLStatementCallback = () => {
			log({
				message: 'User updated',
				statement: sqlStatement,
				type: 'info'
			})
		}

		const handleError: SQLStatementErrorCallback = (_, error) => {
			log({
				message: 'Update user error',
				statement: sqlStatement,
				type: 'error',
				error,
			})
			return true
		}

		executeSql(sqlStatement, values, handleSuccess, handleError)
	}

	const remove = ({ username }: TUser) => {
		const values = [username]
		const sqlStatement = `DELETE FROM users WHERE username=?`

		const handleSuccess: SQLStatementCallback = () => {
			log({
				message: 'User removed',
				statement: sqlStatement,
				type: 'info'
			})
		}

		const handleError: SQLStatementErrorCallback = (_, error) => {
			log({
				message: 'Remove user error',
				statement: sqlStatement,
				type: 'error',
				error,
			})
			return true
		}

		executeSql(sqlStatement, values, handleSuccess, handleError)
	}

	const getAll = useCallback((): Promise<TUser[]> => {
		const sqlStatement = `SELECT * FROM users`

		return new Promise<TUser[]>((resolve, reject) => {
			const handleSuccess: SQLStatementCallback = (_, { rows }) => {
				const users: TUser[] = Object.values(rows)
				resolve(users)
			}

			const handleError: SQLStatementErrorCallback = (_, error) => {
				reject(error)
				return true
			}

			executeSql(sqlStatement, [], handleSuccess, handleError)
		})
	}, [executeSql])


	useEffect(() => {
		createTable()
	}, [createTable])

	return {
		addUser: add,
		updateUser: update,
		removeUser: remove,
		getAllUsers: getAll,
	}
}


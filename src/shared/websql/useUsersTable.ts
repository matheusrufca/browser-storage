
import { useCallback, useEffect } from 'react'
import { IUser } from '../../types'
import { useExecuteSql } from './useExecuteSql'
import { useLogsTable } from './useLogsTable'

const CREATE_TABLE_STATEMENT = 'CREATE TABLE IF NOT EXISTS users(email type unique, name)'

export const useUsersTable = () => {
	const { executeSql } = useExecuteSql()
	const { log } = useLogsTable()

	const createTable = useCallback(() => {
		executeSql(CREATE_TABLE_STATEMENT, undefined, () => {
			console.debug('Users table created')
		})
	}, [executeSql])


	const addRow = useCallback(({ email, name }: IUser) => {
		const values = [email, name]
		const sqlStatement = `INSERT INTO users(email, name) VALUES(?,?)`

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
	}, [executeSql, log])

	const updateRow = useCallback(({ email, name }: IUser) => {
		const values = [email, name, email]
		const sqlStatement = `UPDATE users SET email=?, name=? WHERE email=?`

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
	}, [executeSql, log])

	const removeRow = useCallback(({ email }: IUser) => {
		const values = [email]
		const sqlStatement = `DELETE FROM users WHERE email=?`

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
	}, [executeSql, log])

	const getAllRows = useCallback((): Promise<IUser[]> => {
		const sqlStatement = `SELECT * FROM users`

		return new Promise<IUser[]>((resolve, reject) => {
			const handleSuccess: SQLStatementCallback = (_, { rows }) => {
				const users: IUser[] = Object.values(rows)
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
		 addRow,
		 updateRow,
		 removeRow,
		 getAllRows,
	}
}


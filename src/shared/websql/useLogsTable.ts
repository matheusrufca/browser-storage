
import { useCallback } from 'react';
import { openDatabase } from './database';

export type TLogMessage = {
	message: string
	statement: string
	type: 'error' | 'info' | 'debug' | 'trace'
	error?: SQLError
}

const timestamp = () => new Date().getTime()

export const useLogsTable = () => {

	// TODO: create table if not created

	const log = useCallback((log: TLogMessage): Promise<SQLTransaction> => {
		const values = [JSON.stringify(log), log.type, timestamp()]
		const sqlStatement = `INSERT INTO logs(message, type, timestamp) VALUES(?,?,?)`
		return new Promise<SQLTransaction>(async (resolve, reject) => {
			const database = await openDatabase()
			database.transaction(transaction => {
				transaction.executeSql(
					sqlStatement,
					values,
					(transaction) => { resolve(transaction) },
					(_, error) => {
						console.error('An error ocurred while logging transaction', error)
						reject(error)
						return true
					})
			})
		})
	}, [])

	return {
		log
	}
}
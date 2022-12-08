
import { useCallback } from 'react';
import { database } from './database';

export type TLogMessage = {
	message: string
	statement: string
	type: 'error' | 'info' | 'debug' | 'trace'
	error?: SQLError
}

const timestamp = () => new Date().getTime()

export const useLogsTable = () => {

	// TODO: create table if not created

	const log = useCallback((log: TLogMessage) => {
		const values = [JSON.stringify(log), log.type, timestamp()]
		const sqlStatement = `INSERT INTO logs(message, type, timestamp) VALUES(?,?,?)`

		database.transaction(transaction => {
			transaction.executeSql(sqlStatement, values, undefined, (_, error) => {
				console.error('An error ocurred while logging transaction', error)
				return true
			})
		})
	}, [])

	return {
		log
	}
}
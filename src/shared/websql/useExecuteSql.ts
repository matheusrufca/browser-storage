
import { database } from './database'
import { useLogsTable } from './useLogsTable'
import { useCallback } from 'react';

export const useExecuteSql = () => {
	const { log } = useLogsTable()

	const executeSql = useCallback((sqlStatement: string, args?: ObjectArray, onSuccess?: SQLStatementCallback, onError?: SQLStatementErrorCallback) => {
		const handleSuccess: SQLStatementCallback = (transaction, result) => {
			console.debug('executeSql:success', sqlStatement, result)
			onSuccess?.(transaction, result)
		}
		const handleError: SQLStatementErrorCallback = (transaction, error) => {
			console.error('executeSql:error', sqlStatement, error)
			log({
				type: 'error',
				message: error.message.toString(),
				statement: sqlStatement,
				error,
			})
			return onError?.(transaction, error) || true
		}

		database.transaction((transaction) => {
			console.debug('executeSql:executing', sqlStatement)
			transaction.executeSql(sqlStatement, args, handleSuccess, handleError)
		})
	}, [log])

	return {
		executeSql
	}
}

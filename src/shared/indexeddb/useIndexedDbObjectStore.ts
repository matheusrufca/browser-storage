import { useCallback } from 'react';
import { IDatabaseConfig, openDatabase } from './database'
import { indexes, objectStores } from './objectStores';

const databaseConfig: IDatabaseConfig = {
	onUpgradeNeeded: (_, database) => {
		loadSchema(database)
	}
}

const loadSchema = (database: IDBDatabase) => {
	Object.entries(objectStores).forEach(([storeName, storeConfig]) => {
		const store = database.createObjectStore(storeName, storeConfig)
		const index = indexes[storeName]

		if (index) {
			store.createIndex(index.name, index.keyPath, index.options)
		}
	})


}

export const useIndexedDbObjectStore = () => {
	const getObjectStore = useCallback(async (storeName: string, transactionMode: IDBTransactionMode) => {
		try {
			const database = await openDatabase(databaseConfig)
			return database.transaction(storeName, transactionMode).objectStore(storeName)
		} catch (error) {
			console.error('error loading transaction', error)
			throw error
		}
	}, [])

	return {
		getObjectStore
	}
}

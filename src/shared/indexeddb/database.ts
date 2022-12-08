const DATABASE_NAME = 'database'
const DATABASE_VERSION = 1

export type IDatabaseConfig = {
	onBlocked?: () => void
	onUpgradeNeeded?: (event: IDBVersionChangeEvent, database: IDBDatabase) => void
}

export const openDatabase = ({ onUpgradeNeeded }: IDatabaseConfig): Promise<IDBDatabase> => {
	

	return new Promise<IDBDatabase>((resolve, reject) => {
		const openDatabaseRequest = indexedDB.open(DATABASE_NAME, DATABASE_VERSION)
		
		openDatabaseRequest.onerror = (event) => {
			console.error('indexeddb:error', event)
			reject(event)
		}

		openDatabaseRequest.onupgradeneeded = (event: IDBVersionChangeEvent) => {
			/** Here database structure can be changed */
			console.warn('indexeddb:upgradeneeded', event)

			const database = (event.target as any).result as IDBDatabase
			onUpgradeNeeded?.(event, database)
		}

		openDatabaseRequest.onblocked = (event) => {
			console.warn('indexeddb:blocked', event)
		}

		openDatabaseRequest.onsuccess = (event) => {
			const database = (event.target as any).result as IDBDatabase
			resolve(database)
		}
	})
}
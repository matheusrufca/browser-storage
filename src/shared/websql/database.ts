const MB = 1024 * 1024
const DATABASE_NAME = 'database'
const DATABASE_SIZE = 5 * MB

export const openDatabase = (): Database => {
	return window.openDatabase(DATABASE_NAME, '', DATABASE_NAME, DATABASE_SIZE, (db) => {
		console.debug('Database created', db)
	})
}

export const database = openDatabase()
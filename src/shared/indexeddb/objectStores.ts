export const objectStores: Record<string, IDBObjectStoreParameters | undefined> = Object.freeze({
	devices: {
		keyPath: 'id',
		autoIncrement: true,
	},
	users: {
		keyPath: 'email'
	},
	logs: {
		keyPath: 'id',
		autoIncrement: true,
	}
})
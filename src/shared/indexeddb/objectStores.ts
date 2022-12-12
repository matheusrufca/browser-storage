export const objectStores: Record<string, IDBObjectStoreParameters | undefined> = Object.freeze({
	devices: {
		keyPath: 'id',
		autoIncrement: true,
	},
	users: {
		keyPath: 'id',
		autoIncrement: true,
	},
	logs: {
		keyPath: 'id',
		autoIncrement: true,
	}
})


type IIndexConfig = {
	name: string
	keyPath: string
	options?: IDBIndexParameters
}

export const indexes: Record<string, IIndexConfig> = {
	users: {
		name: 'index_users_email',
		keyPath: 'email',
		options: {
			unique: true
		}
	}
}
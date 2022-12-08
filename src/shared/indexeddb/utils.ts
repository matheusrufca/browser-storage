export const createPromise = <T>(dbRequest: IDBRequest): Promise<T> => {
	return new Promise((resolve, reject) => {
		dbRequest.onsuccess = (event) => {
			const result = (event.target as any).result as T
			resolve(result)
		}
		dbRequest.onerror = (event) => {
			reject(event)
		}
	})
}
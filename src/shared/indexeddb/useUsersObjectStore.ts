import { useCallback } from 'react'
import { IUser } from '../../types'
import { useIndexedDbObjectStore } from './useIndexedDbObjectStore'
import { createPromise } from './utils'

export type TKey = IUser['email']

const STORE_NAME = 'users'

export const useUsersObjectStore = () => {
	const { getObjectStore } = useIndexedDbObjectStore()

	const add = useCallback(async (data: IUser): Promise<TKey> => {
		try {
			const objectStore = await getObjectStore(STORE_NAME, 'readwrite')
			const databaseRequest = objectStore?.add(data)
			return createPromise<TKey>(databaseRequest)
		} catch (error) {
			throw error
		}
	}, [getObjectStore])

	const update = useCallback(async (id: TKey, data: IUser): Promise<TKey> => {
		try {
			const objectStore = await getObjectStore(STORE_NAME, 'readwrite')
			const databaseRequest = objectStore?.put(data)
			return createPromise<TKey>(databaseRequest)
		} catch (error) {
			throw error
		}
	}, [getObjectStore])

	const remove = useCallback(async (id: TKey): Promise<void> => {
		try {
			const objectStore = await getObjectStore(STORE_NAME, 'readwrite')
			const databaseRequest = objectStore?.delete(id)
			return createPromise<void>(databaseRequest)
		} catch (error) {
			throw error
		}
	}, [getObjectStore])

	const getAll = useCallback(async (): Promise<IUser[]> => {
		try {
			const objectStore = await getObjectStore(STORE_NAME, 'readonly')
			const databaseRequest = objectStore?.getAll()
			return createPromise<IUser[]>(databaseRequest)
		} catch (error) {
			throw error
		}
	}, [getObjectStore])

	const getById = useCallback(async (id: TKey): Promise<IUser> => {
		try {
			const objectStore = await getObjectStore(STORE_NAME, 'readonly')
			const databaseRequest = objectStore?.get(id)
			return createPromise<IUser>(databaseRequest)
		} catch (error) {
			throw error
		}
	}, [getObjectStore])

	return {
		add,
		update,
		remove,
		getById,
		getAll,
	}
}

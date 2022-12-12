import { useCallback } from 'react'
import { IUser } from '../../types'
import { useIndexedDbObjectStore } from './useIndexedDbObjectStore'
import { createPromise } from './utils'

export type TKey = NonNullable<IUser['id']>

const STORE_NAME = 'users'

export const useUsersObjectStore = () => {
	const { getObjectStore } = useIndexedDbObjectStore()

	const addObject = useCallback(async (data: IUser): Promise<TKey> => {
		try {
			const objectStore = await getObjectStore(STORE_NAME, 'readwrite')
			const databaseRequest = objectStore?.add(data)
			return createPromise<TKey>(databaseRequest)
		} catch (error) {
			throw error
		}
	}, [getObjectStore])

	const updateObject = useCallback(async (id: TKey, data: IUser): Promise<TKey> => {
		try {
			const objectStore = await getObjectStore(STORE_NAME, 'readwrite')
			const databaseRequest = objectStore?.put(data)
			return createPromise<TKey>(databaseRequest)
		} catch (error) {
			throw error
		}
	}, [getObjectStore])

	const removeObject = useCallback(async (id: TKey): Promise<void> => {
		try {
			const objectStore = await getObjectStore(STORE_NAME, 'readwrite')
			const databaseRequest = objectStore?.delete(id)
			return createPromise<void>(databaseRequest)
		} catch (error) {
			throw error
		}
	}, [getObjectStore])

	const getAllObjects = useCallback(async (): Promise<IUser[]> => {
		try {
			const objectStore = await getObjectStore(STORE_NAME, 'readonly')
			const databaseRequest = objectStore?.getAll()
			return createPromise<IUser[]>(databaseRequest)
		} catch (error) {
			throw error
		}
	}, [getObjectStore])

	const getObjectById = useCallback(async (id: TKey): Promise<IUser> => {
		try {
			const objectStore = await getObjectStore(STORE_NAME, 'readonly')
			const databaseRequest = objectStore?.get(id)
			return createPromise<IUser>(databaseRequest)
		} catch (error) {
			throw error
		}
	}, [getObjectStore])

	return {
		addObject,
		updateObject,
		removeObject,
		getObjectById,
		getAllObjects,
	}
}

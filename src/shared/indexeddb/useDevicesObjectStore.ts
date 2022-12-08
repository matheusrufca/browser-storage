import { useCallback } from 'react'
import { IDevice } from '../../types'
import { useIndexedDbObjectStore } from './useIndexedDbObjectStore'
import { createPromise } from './utils'

export type TKey = IDevice['id']

const STORE_NAME = 'devices'

export const useDevicesObjectStore = () => {
	const { getObjectStore } = useIndexedDbObjectStore()

	const add = useCallback(async (device: Omit<IDevice, 'id'>): Promise<TKey> => {
		try {
			const objectStore = await getObjectStore(STORE_NAME, 'readwrite')
			const databaseRequest = objectStore?.add(device)
			return createPromise<TKey>(databaseRequest)
		} catch (error) {
			throw error
		}
	}, [getObjectStore])

	const update = useCallback(async (data: IDevice): Promise<TKey> => {
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

	const getAll = useCallback(async (): Promise<IDevice[]> => {
		try {
			const objectStore = await getObjectStore(STORE_NAME, 'readonly')
			const databaseRequest = objectStore?.getAll()
			return createPromise<IDevice[]>(databaseRequest)
		} catch (error) {
			throw error
		}
	}, [getObjectStore])

	const getById = useCallback(async (id: TKey): Promise<IDevice> => {
		try {
			const objectStore = await getObjectStore(STORE_NAME, 'readonly')
			const databaseRequest = objectStore?.get(id)
			return createPromise<IDevice>(databaseRequest)
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

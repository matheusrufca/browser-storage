import { useCallback, useEffect, useState } from 'react'
import { TKey, useUsersObjectStore } from '../../shared/indexeddb/useUsersObjectStore'
import { IUser } from '../../types'


export const useUsers = () => {
	const userStore = useUsersObjectStore()
	const [data, setData] = useState<IUser[]>([])

	const getAll = useCallback(async () => {
		try {
			const result = await userStore.getAll()
			console.debug('getAllUsers', result)
			setData(result)
		} catch (error) {
			console.error('Unable to fetch users', error)
		}
	}, [userStore])

	const add = useCallback(async (data: IUser) => {
		try {
			const result = await userStore.add(data)
			await userStore.getAll()
			console.debug('addUser', result)
		} catch (error) {
			console.error('Unable to add user', data, error)
			throw error
		}
	}, [userStore])

	const edit = useCallback(async (id: TKey, data: IUser) => {
		try {
			const result = await userStore.update(id, data)
			await userStore.getAll()
			console.debug('editUser', result)
		} catch (error) {
			console.error('Unable to edit user', data, error)
			throw error
		}
	}, [userStore])

	const remove = useCallback(async (data: IUser) => {
		try {
			const result = await userStore.remove(data.email)
			await userStore.getAll()
			console.debug('removeUser', result)
		} catch (error) {
			console.error('Unable to remove user', data, error)
			throw error
		}
	}, [userStore])

	useEffect(() => {
		getAll()
	}, [getAll])

	return {
		data,
		add,
		edit,
		remove,
		getAll
	}
}

export default useUsers
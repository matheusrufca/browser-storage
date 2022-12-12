import { useCallback, useEffect, useState } from 'react'
import { TKey, useUsersObjectStore } from '../../shared/indexeddb/useUsersObjectStore'
import { IUser } from '../../types'


export const useUsers = () => {
	const { getAllObjects, addObject, updateObject, removeObject } = useUsersObjectStore()
	const [data, setData] = useState<IUser[]>([])

	const getAll = useCallback(async () => {
		try {
			const result = await getAllObjects()
			console.debug('getAllUsers', result)
			setData(result)
		} catch (error) {
			console.error('Unable to fetch users', error)
		}
	}, [getAllObjects])

	const add = useCallback(async (data: IUser) => {
		try {
			const result = await addObject(data)
			await getAll()
			console.debug('addUser', result)
		} catch (error) {
			console.error('Unable to add user', data, error)
			throw error
		}
	}, [addObject, getAll])

	const edit = useCallback(async (id: TKey, data: IUser) => {
		try {
			const result = await updateObject(id, data)
			await getAll()
			console.debug('editUser', result)
		} catch (error) {
			console.error('Unable to edit user', data, error)
			throw error
		}
	}, [getAll, updateObject])

	const remove = useCallback(async (data: IUser) => {
		if (!data.id) return
		try {
			const result = await removeObject(data.id)
			await getAll()
			console.debug('removeUser', result)
		} catch (error) {
			console.error('Unable to remove user', data, error)
			throw error
		}
	}, [getAll, removeObject])

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
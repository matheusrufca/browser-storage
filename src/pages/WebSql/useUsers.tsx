import { useCallback, useEffect, useState } from 'react'
import { useUsersTable } from '../../shared/websql'
import { IUser } from '../../types'

export const useUsers = () => {
	const usersTable = useUsersTable()
	const [data, setData] = useState<IUser[]>([])

	const getAll = useCallback(async () => {
		const users = await usersTable.getAll()
		setData(users)
	}, [usersTable])

	const add = useCallback((data: IUser) => {
		usersTable.add(data)
		getAll()
	}, [getAll, usersTable])

	const edit = useCallback((id: string, user: IUser) => {
		usersTable.update(user)
		getAll()
	}, [getAll, usersTable])

	const remove = useCallback((user: IUser) => {
		usersTable.remove(user)
		getAll()
	}, [getAll, usersTable])

	useEffect(() => {
		getAll()
	}, [getAll, usersTable])

	return {
		data,
		add,
		edit,
		remove,
		getAll,
		refresh: getAll
	}
}

export default useUsers

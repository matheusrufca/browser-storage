import { useCallback, useEffect, useState } from 'react'
import { useUsersTable } from '../../shared/websql/useUsersTable'
import { IUser } from '../../types'

export const useUsers = () => {
	const { addRow, getAllRows, updateRow, removeRow } = useUsersTable()
	const [data, setData] = useState<IUser[]>([])

	const getAll = useCallback(async () => {
		const users = await getAllRows()
		setData(users)
	}, [getAllRows])

	const add = useCallback((data: IUser) => {
		addRow(data)
		getAll()
	}, [addRow, getAll])

	const edit = useCallback((id: number, user: IUser) => {
		updateRow(user)
		getAll()
	}, [getAll, updateRow])

	const remove = useCallback((user: IUser) => {
		removeRow(user.email)
		getAll()
	}, [getAll, removeRow])

	useEffect(() => {
		getAll()
	}, [getAll])

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

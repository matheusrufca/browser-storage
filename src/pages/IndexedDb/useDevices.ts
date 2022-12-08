import { useCallback, useEffect, useState } from 'react'
import { PartialDevice } from '../../components/Devices/FormAddDevice'
import { TKey, useDevicesObjectStore } from '../../shared/indexeddb/useDevicesObjectStore'
import { IDevice } from '../../types'


export const useDevices = () => {
	const { addObject, getAllObjects, updateObject, removeObject } = useDevicesObjectStore()
	const [data, setData] = useState<IDevice[]>([])

	const getAll = useCallback(async () => {
		try {
			const result = await getAllObjects()
			console.debug('getAllDevices', result)
			setData(result)
		} catch (error) {
			console.error('Unable to fetch devices', error)
		}
	}, [getAllObjects])

	const add = useCallback(async (data: PartialDevice) => {
		try {
			const result = await addObject(data)
			await getAll()
			console.debug('addDevice', result)
		} catch (error) {
			console.error('Unable to add device', data, error)
			throw error
		}
	}, [addObject, getAll])

	const edit = useCallback(async (id: TKey, data: IDevice) => {
		try {
			const result = await updateObject(data)
			await getAll()
			console.debug('editDevice', result)
		} catch (error) {
			console.error('Unable to edit device', data, error)
			throw error
		}
	}, [getAll, updateObject])

	const remove = useCallback(async (data: IDevice) => {
		try {
			const result = await removeObject(data.id)
			await getAll()
			console.debug('removeDevice', result)
		} catch (error) {
			console.error('Unable to remove device', data, error)
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
		refresh: getAll
	}
}

export default useDevices
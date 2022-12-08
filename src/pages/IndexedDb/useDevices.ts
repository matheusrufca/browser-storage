import { useCallback, useEffect, useState } from 'react'
import { PartialDevice } from '../../components/Devices/FormAddDevice'
import { TKey, useDevicesObjectStore } from '../../shared/indexeddb/useDevicesObjectStore'
import { IDevice } from '../../types'


export const useDevices = () => {
	const deviceStore = useDevicesObjectStore()
	const [data, setData] = useState<IDevice[]>([])

	const getAll = useCallback(async () => {
		try {
			const result = await deviceStore.getAll()
			console.debug('getAllDevices', result)
			setData(result)
		} catch (error) {
			console.error('Unable to fetch devices', error)
		}
	}, [deviceStore])

	const add = useCallback(async (data: PartialDevice) => {
		try {
			const result = await deviceStore.add(data)
			await getAll()
			console.debug('addDevice', result)
		} catch (error) {
			console.error('Unable to add device', data, error)
			throw error
		}
	}, [deviceStore, getAll])

	const edit = useCallback(async (id: TKey, data: IDevice) => {
		try {
			const result = await deviceStore.update(data)
			await getAll()
			console.debug('editDevice', result)
		} catch (error) {
			console.error('Unable to edit device', data, error)
			throw error
		}
	}, [deviceStore, getAll])

	const remove = useCallback(async (data: IDevice) => {
		try {
			const result = await deviceStore.remove(data.id)
			await getAll()
			console.debug('removeDevice', result)
		} catch (error) {
			console.error('Unable to remove device', data, error)
			throw error
		}
	}, [deviceStore, getAll])

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
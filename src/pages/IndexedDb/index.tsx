import React, { FC } from 'react'
import { Devices } from '../../components/Devices'
import { Users } from '../../components/Users'
import { useUsers } from './useUsers';
import { useDevices } from './useDevices';

export const IndexedDb: FC = () => {
	const userStore = useUsers()
	const deviceStore = useDevices()

	return (
		<div>
			<div className='mb-2'>
				<Users
					data={userStore.data}
					onAdd={userStore.add}
					onEdit={userStore.edit}
					onRemove={userStore.remove}
				/>
			</div>

			<div className='mb-2'>
				<Devices 
					data={deviceStore.data}
					onAdd={deviceStore.add}
					onEdit={deviceStore.edit}
					onRemove={deviceStore.remove}
				/>
			</div>
		</div>
	)
}

export default IndexedDb
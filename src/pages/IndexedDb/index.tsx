import React, { FC } from 'react'
import { Devices } from '../../components/Devices'
import { Users } from '../../components/Users'
import { useUsers } from './useUsers';
import { useDevices } from './useDevices';

export const IndexedDb: FC = () => {
	const userStore = useUsers()
	const deviceStore = useDevices()

	return (
		<section>
			<header>
				<h1>IndexedDB</h1>
			</header>

			<main className='py-4'>
				<div className='mb-3'>
					<Users
						data={userStore.data}
						onAdd={userStore.add}
						onEdit={userStore.edit}
						onRemove={userStore.remove}
					/>
				</div>
				
				<hr />

				<div className='mb-3'>
					<Devices
						data={deviceStore.data}
						onAdd={deviceStore.add}
						onEdit={deviceStore.edit}
						onRemove={deviceStore.remove}
					/>
				</div>
			</main>
		</section>
	)
}

export default IndexedDb
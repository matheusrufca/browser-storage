import React, { memo } from 'react'
import { FormAddDevice } from '../../components/Devices'
import { IDevice, MaybePromise } from '../../types'
import DevicesList from './DevicesList'
import { TKey } from '../../shared/indexeddb/useDevicesObjectStore';
import { PartialDevice } from './FormAddDevice';

type Props = {
	data: IDevice[]
	onAdd: MaybePromise<[PartialDevice], void>
	onEdit: MaybePromise<[TKey, IDevice], void>
	onRemove: MaybePromise<[IDevice], void>
}

export const Devices = memo<Props>(({ data, onAdd, onEdit, onRemove }) => {

	return (
		<section className='mb-4'>
			<header>
				<h2>Devices</h2>
			</header>
			
			<div className='mb-2'>
				<FormAddDevice onSubmit={onAdd} />
			</div>

			<DevicesList
				data={data}
				onEdit={onEdit}
				onRemove={onRemove}
			/>
		</section>
	)
})

export default Devices
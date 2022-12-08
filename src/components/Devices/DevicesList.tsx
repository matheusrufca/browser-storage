import React, { ChangeEvent, CSSProperties, memo, useState } from 'react'
import { Button, ButtonGroup, Form, Table } from 'react-bootstrap'
import { TKey } from '../../shared/indexeddb/useDevicesObjectStore'
import { IDevice } from '../../types'

type DeviceRowProps = {
	data: IDevice
	onEdit: (id: TKey, data: IDevice) => void
	onRemove: (data: IDevice) => void
}

type Props = {
	data: IDevice[],
	onEdit: (id: TKey, data: IDevice) => void
	onRemove: (data: IDevice) => void
}


const styles: Record<string, CSSProperties> = {
	tableCell: { verticalAlign: 'middle', },
	id: { width: '80px', textAlign: 'center', },
	actions: { width: '100px', textAlign: 'center', }
}


const ListItem = memo<DeviceRowProps>(({ data, onEdit, onRemove }) => {
	const [formValues, setFormValues] = useState<IDevice>(data)
	const [isEditing, setIsEditing] = useState(false)

	const handleEdit = () => {
		setIsEditing(true)
	}

	const handleRemove = async () => {
		await onRemove(data)
	}

	const handleCancel = () => {
		setIsEditing(false)
		setFormValues(data)
	}

	const handleSave = async () => {
		await onEdit(data.id, formValues)
		setIsEditing(false)
	}

	const handleModelChange = (event: ChangeEvent<HTMLInputElement>) => {
		setFormValues((previous) => ({
			...previous,
			model: event.target.value
		}))
	}

	const handleBrandChange = (event: ChangeEvent<HTMLInputElement>) => {
		setFormValues((previous) => ({
			...previous,
			brand: event.target.value
		}))
	}

	return (
		<tr>
			<td style={{ ...styles.tableCell, ...styles.id }}>
				{data.id}
			</td>

			<td style={{ ...styles.tableCell }}>
				{isEditing
					? (
						<Form.Control
							type='model'
							value={formValues.model}
							placeholder='Model'
							onChange={handleModelChange}
						/>
					)
					: data.model
				}
			</td>

			<td style={{ ...styles.tableCell }}>
				{isEditing
					? (
						<Form.Control
							value={formValues.brand}
							placeholder='Brand'
							onChange={handleBrandChange}
						/>
					)
					: data.brand
				}
			</td>

			<td style={{ ...styles.tableCell, ...styles.actions }}>
				{isEditing
					? (
						<ButtonGroup size='sm'>
							<Button variant='link' onClick={handleSave}>
								Save
							</Button>

							<Button variant='link' onClick={handleCancel}>
								Cancel
							</Button>
						</ButtonGroup>
					)
					: (
						<ButtonGroup size='sm'>
							<Button variant='link' onClick={handleEdit}>
								Edit
							</Button>

							<Button variant='link' onClick={handleRemove}>
								Remove
							</Button>
						</ButtonGroup>
					)
				}
			</td>
		</tr>
	)
})

export const DevicesList = memo<Props>(({ data: devices, onEdit, onRemove }) => {
	return (
		<Table striped bordered hover>
			<thead>
				<tr>
					<th style={{ ...styles.tableCell, ...styles.id }}>#</th>
					<th style={{ ...styles.tableCell }}>Model</th>
					<th style={{ ...styles.tableCell }}>Brand</th>
					<th style={{ ...styles.tableCell, ...styles.actions }}></th>
				</tr>
			</thead>
			<tbody>
				{
					devices.map(device => (
						<ListItem
							key={device.id}
							data={device}
							onEdit={onEdit}
							onRemove={onRemove}
						/>
					))
				}
			</tbody>
		</Table>
	)
})

export default DevicesList
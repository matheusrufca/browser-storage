import React, { ChangeEvent, CSSProperties, memo, useState } from 'react'
import { Button, ButtonGroup, Form, Table } from 'react-bootstrap'
import { TKey } from '../../shared/indexeddb/useUsersObjectStore'
import { IUser } from '../../types'

type UserRowProps = {
	data: IUser
	onEdit: (id: TKey, data: IUser) => void
	onRemove: (data: IUser) => void
}

type Props = {
	data: IUser[],
	onEdit: (id: TKey, data: IUser) => void
	onRemove: (data: IUser) => void
}

const styles: Record<string, CSSProperties> = {
	tableCell: { verticalAlign: 'middle', },
	actions: { width: '100px', textAlign: 'center', }
}

const UserListItem = memo<UserRowProps>(({ data, onEdit, onRemove }) => {
	const [formValues, setFormValues] = useState<IUser>(data)
	const [isEditing, setIsEditing] = useState(false)

	const handleEdit = () => {
		setIsEditing(true)
	}

	const handleCancel = () => {
		setIsEditing(false)
		setFormValues(data)
	}

	const handleRemove = async () => {
		await onRemove(data)
	}

	const handleSave = async () => {
		await onEdit(data.email, formValues)
		setIsEditing(false)
	}

	const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
		setFormValues((previous) => ({
			...previous,
			name: event.target.value
		}))
	}

	return (
		<tr>
			<td style={{ ...styles.tableCell }}>
				{data.email}
			</td>

			<td style={{ ...styles.tableCell }}>
				{isEditing
					? (
						<Form.Control
							value={formValues.name}
							onChange={handleNameChange}
						/>
					)
					: data.name
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

export const UsersList = memo<Props>(({ data, onEdit, onRemove }) => {
	return (
		<Table striped bordered hover>
			<thead>
				<tr>
					<th style={{ ...styles.tableCell }}>Email</th>
					<th style={{ ...styles.tableCell }}>Name</th>
					<th style={{ ...styles.tableCell, ...styles.actions }}></th>
				</tr>
			</thead>
			<tbody>
				{
					data.map(user => (
						<UserListItem
							key={user.email}
							data={user}
							onEdit={onEdit}
							onRemove={onRemove}
						/>
					))
				}
			</tbody>
		</Table>
	)
})

export default UsersList
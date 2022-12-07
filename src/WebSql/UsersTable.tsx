import React, { ChangeEvent, memo, useState } from 'react'
import { Button, Form, Table } from 'react-bootstrap'
import { TUser } from '../shared/websql'

type UserRowProps = {
	user: TUser
	onEdit: (user: TUser) => void
	onRemove: (user: TUser) => void
}

type Props = {
	users: TUser[],
	onEdit: (user: TUser) => void
	onRemove: (user: TUser) => void
}

const UserRow = memo<UserRowProps>(({ user, onEdit, onRemove }) => {
	const [form, setForm] = useState<TUser>(user)
	const [isEditing, setIsEditing] = useState(false)

	const handleEdit = () => {
		setIsEditing(true)
	}

	const handleRemove = () => {
		onRemove(user)
	}

	const handleSave = () => {
		onEdit(form)
		setIsEditing(false)
	}

	const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
		setForm((previous) => ({
			...previous,
			email: event.target.value
		}))
	}
	const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
		setForm((previous) => ({
			...previous,
			name: event.target.value
		}))
	}

	return (
		<tr>
			<td>
				{user.username}
			</td>

			<td>
				{!isEditing && user.email}
				{isEditing &&
					<Form.Control
						type='email'
						value={form.email}
						onChange={handleEmailChange}
					/>
				}
			</td>

			<td>
				{!isEditing && user.name}
				{isEditing &&
					<Form.Control
						value={form.name}
						onChange={handleNameChange}
					/>
				}
			</td>

			<td>
				{!isEditing &&
					<Button variant='link' className='mr-1' onClick={handleEdit}>
						Edit
					</Button>
				}

				{!isEditing &&
					<Button variant='link' onClick={handleRemove}>
						Remove
					</Button>
				}

				{isEditing &&
					<Button variant='link' onClick={handleSave}>
						Save
					</Button>
				}
			</td>
		</tr>
	)
})

export const UsersTable = memo<Props>(({ users, onEdit, onRemove }) => {
	return (
		<Table striped bordered hover>
			<thead>
				<tr>
					<th>Username</th>
					<th>Email</th>
					<th>Name</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{
					users.map(user => (
						<UserRow
							key={user.username}
							user={user}
							onEdit={onEdit}
							onRemove={onRemove}
						/>
					))
				}
			</tbody>
		</Table>
	)
})

export default UsersTable
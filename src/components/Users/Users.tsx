import React, { memo } from 'react'
import { FormAddUser, UsersList } from '.'
import { TKey } from '../../shared/indexeddb/useUsersObjectStore'
import { IUser, MaybePromise } from '../../types'

type Props = {
	data: IUser[]
	onAdd: MaybePromise<[IUser], void>
	onEdit: MaybePromise<[TKey, IUser], void>
	onRemove: MaybePromise<[IUser], void>
}

export const Users = memo<Props>(({ data, onAdd, onEdit, onRemove }) => {
	return (
		<section className='mb-4'>
			<header>
				<h2>Users</h2>
			</header>

			<div className='mb-2'>
				<FormAddUser onSubmit={onAdd} />
			</div>

			<UsersList
				data={data}
				onEdit={onEdit}
				onRemove={onRemove}
			/>
		</section>
	)
})

export default Users
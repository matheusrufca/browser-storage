import React, { ChangeEvent, FormEvent, memo, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { MaybePromise, IUser } from '../../types'

type Props = {
	onSubmit: MaybePromise<[IUser], void>
}

const DEFAULT_STATE = { email: '', name: '', }

export const FormAddUser = memo<Props>(({ onSubmit }) => {
	const [{ email, name }, setUser] = useState<IUser>(DEFAULT_STATE)

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		await onSubmit({ email, name })
		setUser(DEFAULT_STATE)
	}

	const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
		setUser((previous) => ({
			...previous,
			email: event.target.value
		}))
	}


	const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
		setUser((previous) => ({
			...previous,
			name: event.target.value
		}))
	}


	return (
		<Form onSubmit={handleSubmit} className='mb-3'>
			<Row className="align-items-center">
				<Col xs="5">
					<Form.Control
						type='email'
						value={email}
						placeholder='Email'
						onChange={handleEmailChange}
					/>
				</Col>
				<Col xs="5">
					<Form.Control
						value={name}
						placeholder='Name'
						onChange={handleNameChange}
					/>
				</Col>
				<Col xs="2">
					<Button variant="primary" type="submit">
						Add
					</Button>
				</Col>
			</Row>
		</Form>
	)
})

export default FormAddUser;

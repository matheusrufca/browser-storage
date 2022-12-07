import React, { ChangeEvent, FormEvent, memo, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { TUser } from '../../types'

type Props = {
	onSubmit: (user: TUser) => void
}

const DEFAULT_STATE= { username: '', email: '', name: '', }

export const FormAddUser = memo<Props>(({ onSubmit }) => {
	const [{ username, email, name }, setUser] = useState<TUser>(DEFAULT_STATE)

	const handleSubmitUser = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()		
		onSubmit({ username, email, name })
		setUser(DEFAULT_STATE)
	}

	const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
		setUser((previous) => ({
			...previous,
			username: event.target.value
		}))
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
		<Form onSubmit={handleSubmitUser} className='mb-3'>
			<Row className="align-items-center">
				<Col xs="2">
					<Form.Control
						value={username}
						placeholder='Username'
						onChange={handleUsernameChange}
					/>
				</Col>
				<Col xs="4">
					<Form.Control
						type='email'
						value={email}
						placeholder='Email'
						onChange={handleEmailChange}
					/>
				</Col>
				<Col xs="4">
					<Form.Control
						value={name}
						placeholder='Name'
						onChange={handleNameChange}
					/>
				</Col>
				<Col xs="2">
					<Button variant="primary" type="submit">
						Create user
					</Button>
				</Col>
			</Row>
		</Form>
	)
})

export default FormAddUser;

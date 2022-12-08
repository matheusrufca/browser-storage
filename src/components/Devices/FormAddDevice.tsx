import React, { ChangeEvent, FormEvent, memo, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { MaybePromise, IDevice } from '../../types'

export type PartialDevice = Omit<IDevice, 'id'>

type Props = {
	onSubmit: MaybePromise<[PartialDevice], void>
}

const DEFAULT_STATE: PartialDevice = { model: '', brand: '', }

export const FormAddDevice = memo<Props>(({ onSubmit }) => {
	const [{ model, brand }, setDevice] = useState<PartialDevice>(DEFAULT_STATE)

	const handleSubmitDevice = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		await onSubmit({ model, brand })
		setDevice(DEFAULT_STATE)
	}

	const handleModelChange = (event: ChangeEvent<HTMLInputElement>) => {
		setDevice((previous) => ({
			...previous,
			model: event.target.value
		}))
	}


	const handleBrandChange = (event: ChangeEvent<HTMLInputElement>) => {
		setDevice((previous) => ({
			...previous,
			brand: event.target.value
		}))
	}


	return (
		<Form onSubmit={handleSubmitDevice} className='mb-3'>
			<Row className="align-items-center">
				<Col xs="5">
					<Form.Control
						value={model}
						placeholder='Model'
						onChange={handleModelChange}
					/>
				</Col>
				<Col xs="5">
					<Form.Control
						value={brand}
						placeholder='Brand'
						onChange={handleBrandChange}
					/>
				</Col>
				<Col xs="2">
					<Button variant="primary" type="submit" >
						Add
					</Button>
				</Col>
			</Row>
		</Form>
	)
})

export default FormAddDevice;

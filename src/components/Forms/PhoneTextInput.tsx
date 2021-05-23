import { motion } from 'framer-motion'
import React, { ChangeEvent, ComponentPropsWithoutRef, FC } from 'react'
import { c } from '../../services/misc'
import Cleave from 'cleave.js/react'
import 'cleave.js/dist/addons/cleave-phone.cz'
import ErrorMessage from './ErrorMessage'

export interface AuthTextInputFields extends ComponentPropsWithoutRef<'input'> {
	form: any
	value: string
	id: string
	type?: string
}

const PhoneTextInput: FC<AuthTextInputFields> = ({ form, value, id, type = 'text', placeholder }) => {
	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		form.handleChange(e)
		form.errors[id] = ''
		form.errors.api = ''
	}

	return (
		<motion.label layout data-test={`${id}-input-wrapper`} className="block space-y-1 text-dark-blue">
			<Cleave
				className={c(
					form.errors[id] ? 'border-red-500' : 'border-dark-blue',
					'text-medium block w-full px-3 py-2 text-base placeholder-gray-400',
					'focus:ring-0 focus:border-orange-primary focus:shadow-none',
					'md:py-2.5 md:px-2.5'
				)}
				value={value}
				data-test={`${id}-input`}
				id={id}
				options={{
					phone: true,
					phoneRegionCode: 'CZ'
				}}
				placeholder={placeholder}
				onChange={(event: ChangeEvent<HTMLInputElement>) => {
					onChange(event)
				}}
				type={type}
			/>
			{form.errors[id] && <ErrorMessage id={id}>{form.errors[id]}</ErrorMessage>}
		</motion.label>
	)
}

export default PhoneTextInput

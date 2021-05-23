import { motion } from 'framer-motion'
import React from 'react'
import { ChangeEvent, ComponentPropsWithoutRef, FC } from 'react'
import { c } from '../../services/misc'
import ErrorMessage from './ErrorMessage'

export interface AuthTextInputFields extends ComponentPropsWithoutRef<"input"> {
	form: any
	value: string
	id: string
	type?: string
}

const TextInput: FC<AuthTextInputFields> = ({ form, value, id, type = 'text', placeholder, autoComplete }) => {
	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		form.handleChange(e)
		form.errors[id] = ''
		form.errors.api = ''
	}

	return (
		<motion.label
			layout
			data-test={`${id}-input-wrapper`}
			className="block space-y-1 text-dark-blue"
		>
			<motion.input
				layout
                autoComplete={autoComplete}
				className={c(
					form.errors[id] ? 'border-red-500' : 'border-dark-blue',
					'text-medium block w-full px-3 py-2 text-base placeholder-gray-400',
					'focus:ring-0 focus:border-orange-primary focus:shadow-none',
					'md:py-2.5 md:px-2.5'
				)}
				value={value}
				data-test={`${id}-input`}
				id={id}
                placeholder={placeholder}
				onChange={(event) => {
					onChange(event)
				}}
				type={type}
			/>
            {form.errors[id] && <ErrorMessage id={id}>{form.errors[id]}</ErrorMessage>}
		</motion.label>
	)
}

export default TextInput

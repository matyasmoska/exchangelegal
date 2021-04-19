import { motion } from 'framer-motion'
import React from 'react'
import { ChangeEvent, ComponentPropsWithoutRef, FC } from 'react'
import { c } from '../../services/misc'
import ErrorMessage from './ErrorMessage'

export interface AuthTextAreaFields extends ComponentPropsWithoutRef<"textarea"> {
	form: any
	id: string
}

const TextArea: FC<AuthTextAreaFields> = ({ form, value, className, id, rows = 3, placeholder }) => {
	const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		form.handleChange(e)
		form.errors[id] = ''
		form.errors.api = ''
	}

	return (
		<motion.label
			layout
			data-test={`${id}-input-wrapper`}
			className="block space-y-1 text-gray-900"
		>
			<motion.textarea
				layout
				placeholder={placeholder}
				className={c(
					form.errors[id] ? 'border-red-500' : 'border-dark-blue',
					'text-gray-900 text-medium block w-full p-2 px-3 mt-1 resize-none placeholder-gray-400',
					'focus:ring-orange-primary focus:shadow-none',
					'md:py-2.5 md:px-2.5',
					className
				)}
				rows={rows}
				value={value}
				data-test={`${id}-input`}
				id={id}
				onChange={(event) => {
					onChange(event)
				}}
			/>
			<ErrorMessage id={id}>{form.errors[id]}</ErrorMessage>
		</motion.label>
	)
}

export default TextArea

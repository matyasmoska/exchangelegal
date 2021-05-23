import React, { ChangeEvent, FC, ReactNode } from 'react'
import ErrorMessage from './ErrorMessage'

interface CheckboxProps extends React.ComponentPropsWithoutRef<"input"> {
	form: any
	isChecked: boolean,
	label: string,
	id: string,
	className?: string
}

const Checkbox: FC<CheckboxProps> = ({ form, isChecked, id, label, className = '' }) => {
	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		form.handleChange(e)
		console.log(e)
		form.errors[id as string] = ''
		form.errors.api = ''
	}

	return (
		<>
			<label className={`flex items-center ${className}`}>
				<input
					type="checkbox"
					className="w-5 h-5 border cursor-pointer text-dark-blue border-dark-blue"
					onChange={(e) => onChange(e)}
					name={id}
					id={id}
					value={label}
					checked={isChecked}
				/>
				<span className="ml-2">{label}</span>
			</label>
			{ form.errors[id as string]?.length > 0 && <ErrorMessage id={id}>{form.errors[id as string]}</ErrorMessage>}
		</>
	)
}

export default Checkbox

import React, { FC, MouseEventHandler } from 'react'
import { c } from '../../services/misc'

interface ButtonProps {
	type: 'basic' | 'light'
	className: string,
	disabled?: boolean,
	onClick?: MouseEventHandler<HTMLDivElement>
}

const Button: FC<ButtonProps> = ({ type, className, onClick, disabled = false, children }) => {
	const getButtonStyle = () => {
		switch (type) {
			case 'basic':
				return 'bg-orange-primary text-white hover:bg-orange-primary-hover border-orange-primary hover:border-orange-primary-hover'
			case  'light':
				return 'bg-transparent border border-white text-white hover:bg-white hover:text-dark-blue'
		}
	}

	return (
		<div
			onClick={onClick}
			className={c(getButtonStyle(), 'flex items-center justify-center transform-gpu transition cursor-pointer border', className, disabled && '!bg-gray-400 !border-gray-400 !text-gray-100 pointer-events-none')}
		>
			{children}
		</div>
	)
}

export default Button
	
	
const Button2: FC<ButtonProps> = ({ type, className, onClick, disabled = false, children }) => {
	const getButtonStyle = () => {
		switch (type) {
			case 'basic':
				return 'bg-orange-primary text-white hover:bg-orange-primary-hover border-orange-primary hover:border-orange-primary-hover'
			case  'light':
				return 'bg-transparent border border-white text-white hover:bg-white hover:text-dark-blue'
		}
	}

	return (
		<div
			onClick={onClick}
			className={c(getButtonStyle(), 'flex items-center justify-center transform-gpu transition cursor-pointer border', className, disabled && '!bg-gray-400 !border-gray-400 !text-gray-100 pointer-events-none')}
		>
			{children}
		</div>
	)
}

export default Button2

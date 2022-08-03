import React, { FC, MouseEventHandler } from 'react'
import { c } from '../../services/misc'

interface ButtonProps {
	type: 'basic' | 'secondary' | 'light'
	className: string,
	disabled?: boolean,
	onClick?: MouseEventHandler<HTMLDivElement>
}

const Button: FC<ButtonProps> = ({ type, className, onClick, disabled = false, children }) => {
	const getButtonStyle = () => {
		switch (type) {
			case 'basic':
				return 'bg-wine-primary text-white hover:bg-wine-primary-hover border-wine-primary hover:border-wine-primary-hover'
			case 'secondary':
				return 'bg-transparent text-wine-primary hover:text-white hover:bg-wine-primary-hover border-wine-primary hover:border-wine-primary-hover'
			case  'light':
				return 'bg-transparent border border-white text-white hover:bg-white hover:text-dark-blue'
		}
	}

	return (
		<div
			onClick={onClick}
			className={c(getButtonStyle(), 'flex items-center justify-center rounded-full transform-gpu transition cursor-pointer border', className, disabled && '!bg-gray-400 !border-gray-400 !text-gray-100 pointer-events-none')}
		>
			{children}
		</div>
	)
}

export default Button
	
	

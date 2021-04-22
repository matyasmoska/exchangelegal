import React, { FC, MouseEventHandler } from 'react'
import { c } from '../../services/misc'

interface ButtonProps {
	type: 'basic' | 'light'
	className: string,
	onClick?: MouseEventHandler<HTMLDivElement>
}

const Button: FC<ButtonProps> = ({ type, className, onClick, children }) => {
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
			className={c(getButtonStyle(), 'transform-gpu transition cursor-pointer border', className)}
		>
			{children}
		</div>
	)
}

export default Button

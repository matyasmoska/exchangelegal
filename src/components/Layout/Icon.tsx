import { FC } from "react"

interface IconRowProps {
	Icon: FC<any> 
	href: string
}

export const WrappedIconRow: FC<IconRowProps> = ({ children, href, Icon }) => {
	return (
		<div className="flex items-center space-x-3.5">
			<div className="p-2 text-white rounded-full bg-dark-blue">
				<Icon className="w-3 h-3" />
			</div>
			<a className="no-underline hover:underline" href={href}>{children}</a>
		</div>
	)
}

export const IconRow: FC<IconRowProps> = ({ children, href, Icon }) => {
	return (
		<a href={href} target="_blank" rel="noreferrer" className="group inline-flex items-center space-x-3.5">
			<Icon className="fill-current w-7 h-7 text-dark-blue" />
			<span className="group-hover:underline">{children}</span>
		</a>
	)
}
import { motion as m } from 'framer-motion'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import React from 'react'
import { c } from '../../services/misc'

const NavItem: React.FunctionComponent<{ href: string }> = ({ href, children }) => {
	const router = useRouter()

	return (
		<Link href={href} locale={router.locale}>
			<a
				className={c(
					`relative transition p-1.5 pb-1 text-dark-blue`,
					router.pathname === href ? 'cursor-auto' : ''
				)}
			>
				<m.div
                    layoutId={router.pathname === href ? 'selected-path' : undefined}
					className={c(
						'absolute w-full h-full top-0 left-0 border-b-3',
						router.pathname === href
							? 'border-wine-primary'
							: 'hover:border-b-3 border-transparent hover:border-wine-primary'
					)}
				/>
				{children}
			</a>
		</Link>
	)
}

export default NavItem

import React, { FC, Fragment, useState } from 'react'
import { c } from '../../services/misc'
import Logo from './Logo'
import NavItem from './NavItem'
import { AnimatePresence, motion as m } from 'framer-motion'
import { opacityAnimation } from '../../animations/navigation'

const HamburgerIcon: FC<{ sidebarOpen: boolean }> = ({ sidebarOpen }) => {
	return (
		<div className={c('hamburger hamburger--squeeze w-5 h-5 relative', sidebarOpen && 'is-active')}>
			<span className="relative top-0 left-0 hamburger-inner" />
		</div>
	)
}

const NavItems = () => {
	return (
		<Fragment>
			<NavItem href={'/'}>Hlavní stránka</NavItem>
			<NavItem href={'/news'}>Aktuality</NavItem>
			<NavItem href={'/services'}>Naše služby</NavItem>
			<NavItem href={'/calculator'}>Cenový kalkulátor</NavItem>
			<NavItem href={'/contact'}>Kontakty</NavItem>
			<NavItem href={'/about'}>O nás</NavItem>
		</Fragment>
	)
}

const Navigation = () => {
	const [ sidebarOpen, setSidebarOpen ] = useState<boolean>(false)

	return (
		<div
			className={c(
				'flex items-center justify-between w-full py-8 text-black bg-transparent px-36',
                'xl:space-x-12',
				'md:px-8 md:py-5 md:space-x-0'
			)}
		>
			<Logo />
			<div
				className={c(
					'flex items-center space-x-16 font-semibold',
					'2xl:space-x-10 2xl:text-center',
					'xl:space-x-4',
					'md:hidden'
				)}
			>
				<NavItems />
			</div>
			<span className={c('hidden z-50', 'md:block')} onClick={() => setSidebarOpen(!sidebarOpen)}>
				<HamburgerIcon sidebarOpen={sidebarOpen} />
			</span>
			<AnimatePresence>
				{sidebarOpen && (
					<m.div
						{...opacityAnimation}
						className="fixed top-0 left-0 z-40 w-screen h-screen font-bold bg-white text-dark-blue"
					>
						<div className="flex flex-col items-center justify-center h-full space-y-6 text-2xl text-dark-blue">
							<NavItems />
						</div>
					</m.div>
				)}
			</AnimatePresence>
		</div>
	)
}

export default Navigation

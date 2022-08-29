import React, { FC, Fragment, useEffect, useState } from 'react'
import { c } from '../../services/misc'
import Logo from './Logo'
import NavItem from './NavItem'
import { AnimatePresence, motion as m } from 'framer-motion'
import { opacityAnimation } from '../../animations/navigation'
import pageData from '../../data/navigation.json'

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
			<NavItem href={'/aktuality'}>{pageData.news}</NavItem>
			<NavItem href={'/nase-sluzby'}><span className="font-bold">{pageData.services}</span></NavItem>
			<NavItem href={'/zalozeni-minifondu-na-klic'}><span className="font-bold">{pageData.zalozeni}</span></NavItem>
			// tohle je komentář <NavItem href={'/co-je-to-minifond'}>{pageData.cojeto}</NavItem>
			// tohle je komentář <NavItem href={'/povinnosti-spravce-fondu'}>{pageData.povinnostispravcefondu}</NavItem>
			// tohle je komentář <NavItem href={'/casto-kladene-dotazy'}>{pageData.castokladenedotazy}</NavItem>
			<NavItem href={'/o-nas'}>{pageData.about}</NavItem>
			<NavItem href={'/kontakty'}>{pageData.contact}</NavItem>
	
		</Fragment>
	)
}

const Navigation = () => {
	const [ sidebarOpen, setSidebarOpen ] = useState<boolean>(false)

	useEffect(() => {
		if ( sidebarOpen ) document.body.classList.add('overflow-hidden') 
		else document.body.classList.remove('overflow-hidden')
	}, [sidebarOpen])

	return (
		<div
			className={c(
				'flex items-center bg-white justify-between w-full py-7 text-black px-36',
				'font-header',
				'2xl:px-24',
                'xl:space-x-12 xl:px-16',
				'md:px-8 md:py-5 md:space-x-0'
			)}
		>
			<Logo />
			<div
				className={c(
					'flex items-center space-x-14 font-semibold',
					'3xl:space-x-10',
					'2xl:space-x-6 2xl:text-center',
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
						className="fixed top-0 left-0 z-[51] w-screen h-screen overflow-hidden font-bold bg-white text-dark-blue flex flex-col"
					>
						<div className="flex items-center justify-between px-8 py-5">
							<Logo />
							<span onClick={() => setSidebarOpen(prev => !prev)}>
								<HamburgerIcon sidebarOpen={sidebarOpen} />
							</span>
						</div>
						<div className="flex flex-col items-center justify-center flex-grow space-y-6 text-2xl text-dark-blue overflow-auto">
							<NavItems />
						</div>
					</m.div>
				)}
			</AnimatePresence>
		</div>
	)
}

export default Navigation

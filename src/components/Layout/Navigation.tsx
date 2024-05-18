import React, { FC, Fragment, useEffect, useState } from 'react'
import Link from 'next/link'
import { c } from '../../services/misc'
import Logo from './Logo'
import NavItem from './NavItem'
import Button from './Button'
import TopBar from '../Pages/index/TopBar'
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
			<NavItem href={'/nase-sluzby'}>{pageData.services}</NavItem>
			<NavItem href={'/zalozeni-alternativniho-fondu-na-klic'}>{pageData.zalozeni}</NavItem>
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
				'flex items-center bg-white justify-between w-full gap-12 xl:gap-11 lg:gap-3 min-h-header',
				'font-header',
				'px-36', '3xl:px-28', '2xl:px-20', 'lg:px-6'
			)}
		>
			<div className={c('flex items-center justify-between gap-12 xl:gap-4 lg:gap-3 flex-grow max-w-4xl')}>
				<Logo />
				<div className={c('flex items-center justify-between flex-grow max-w-2xl text-center font-semibold md:hidden')}>
					<NavItems />
				</div>
			</div>
			<div className={c('flex items-center justify-between gap-6 flex-grow xl:flex-grow-0 max-w-md md:hidden')}>
				<TopBar />
				<Link href="/nase-sluzby">
					<Button type="secondary" className="px-4 py-2 flex-grow max-w-[216px] xl:hidden">
						{pageData.konzultace}
					</Button>
				</Link>
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
						<div className="flex items-center justify-between px-6 min-h-header">
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

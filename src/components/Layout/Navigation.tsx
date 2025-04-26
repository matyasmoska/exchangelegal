import React, { FC, Fragment, useEffect, useState } from 'react'
import Link from 'next/link'
import { useTranslations } from '../../hooks/useTranslations'
import { c } from '../../services/misc'
import Logo from './Logo'
import NavItem from './NavItem'
import Button from './Button'
import TopBar from '../Pages/index/TopBar'
import LangSelect from './LangSelect'
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
	const t = useTranslations()

	return (
		<Fragment>
			<NavItem href={'/aktuality'}>{t(pageData.news)}</NavItem>
			<NavItem href={'/nase-sluzby'}>{t(pageData.services)}</NavItem>
			<NavItem href={'/zalozeni-alternativniho-fondu-na-klic'}>{t(pageData.zalozeni)}</NavItem>
			<NavItem href={'/o-nas'}>{t(pageData.about)}</NavItem>
			<NavItem href={'/kontakty'}>{t(pageData.contact)}</NavItem>
		</Fragment>
	)
}

const Navigation = () => {
	const t = useTranslations()
	
	const [ sidebarOpen, setSidebarOpen ] = useState<boolean>(false)

	useEffect(() => {
		if ( sidebarOpen ) document.body.classList.add('overflow-hidden') 
		else document.body.classList.remove('overflow-hidden')
	}, [sidebarOpen])

	return (
		<div
			className={c(
				'flex items-center bg-white justify-between w-full gap-12 2xl:gap-4 lg:gap-3 min-h-header md:min-h-header-mobile',
				'font-header',
				'px-36', '3xl:px-28', '2xl:px-20', 'lg:px-6'
			)}
		>
			<div className={c('flex items-center justify-between gap-12 2xl:gap-4 lg:gap-3 flex-grow max-w-4xl')}>
				<Logo />
				<div className={c('flex items-center justify-between flex-grow max-w-2xl text-center font-semibold md:hidden')}>
					<NavItems />
				</div>
			</div>
			<div className={c('flex items-center justify-between gap-4 lg:gap-3 flex-grow 2xl:flex-grow-0 max-w-2xl md:hidden')}>
				<TopBar />
				<Link href="/nase-sluzby">
					<Button type="secondary" className="px-4 py-2 text-center flex-grow max-w-[216px] xl:hidden">
						{t(pageData.konzultace)}
					</Button>
				</Link>
				<LangSelect />
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
						<div className="flex items-center justify-between px-6 min-h-header-mobile">
							<Logo />
							<span onClick={() => setSidebarOpen(prev => !prev)}>
								<HamburgerIcon sidebarOpen={sidebarOpen} />
							</span>
						</div>
						<div className="flex flex-col items-center justify-center flex-grow space-y-6 text-2xl text-dark-blue overflow-auto">
							<NavItems />
							<LangSelect isMobile onSelectionChange={() => setSidebarOpen(false)} />
						</div>
					</m.div>
				)}
			</AnimatePresence>
		</div>
	)
}

export default Navigation

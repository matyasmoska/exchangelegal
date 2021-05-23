import Head from 'next/head'
import React, { FC, useEffect } from 'react'
import Footer from '../components/Layout/Footer'
import Navigation from '../components/Layout/Navigation'
import SEO from '../components/Layout/SEO'
import { useCookie } from 'react-use'
import CookieBar from '../components/Layout/CookieBar'
import { AnimatePresence } from 'framer-motion'
import { useCookies } from 'react-cookie'

const DefaultLayout: FC = ({ children }) => {
	const [cookies, setCookie, removeCookie] = useCookies(['cookie-consent'])

	useEffect(() => { console.log(cookies['cookie-consent']) }, [ cookies ])

	return (
		<div className="text-dark-blue">
			<Head>
				<title>AML solutions</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<SEO />
			<Navigation />
			{children}
			<Footer />
			<AnimatePresence>{!cookies['cookie-consent'] && <CookieBar />}</AnimatePresence>
		</div>
	)
}

export default DefaultLayout

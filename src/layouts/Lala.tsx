import Head from 'next/head'
import React, { FC, useEffect } from 'react'

import SEO from '../components/Layout/SEO'
import CookieBar from '../components/Layout/CookieBar'
import { AnimatePresence } from 'framer-motion'
import { useCookies } from 'react-cookie'

const LaLa: FC = ({ children }) => {
	const [cookies, setCookie, removeCookie] = useCookies(['cookie-consent'])

	useEffect(() => { console.log(cookies['cookie-consent']) }, [ cookies ])

	return (
		<div className="text-dark-blue">
			<Head>		
				<title>AML solutions</title>
				<link rel="icon" href="/favicon.ico" />
				<script async src="https://www.googletagmanager.com/gtag/js?id=UA-198544478-1" />

				{ process.env.NODE_ENV === 'production' && <script dangerouslySetInnerHTML={{ __html: `
                    window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
				  
					gtag('config', 'UA-198544478-1');
                `} }/>}
				
				<script type="application/ld+json" dangerouslySetInnerHTML={{
					__html: `{ "@context": "https://schema.org/", "@type": "CreativeWorkSeries", "name": "Post title", "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "bestRating": "5", "ratingCount": "42" } }`
				}}/>
				
			</Head>
			
			{children}
			
			<AnimatePresence>{!cookies['cookie-consent'] && <CookieBar />}</AnimatePresence>
		</div>
	)
}

export default LaLa

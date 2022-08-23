import Head from 'next/head'
import React, { FC, useEffect } from 'react'
import Footer from '../components/Layout/Footer'
import TopBar from '../components/Pages/index/TopBar'
import Navigation from '../components/Layout/Navigation'
import CookieBar from '../components/Layout/CookieBar'
import { useCookies } from 'react-cookie'

const GA_DATA_LAYER = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}`

const GA_SCRIPT_DEFAULT = `
${GA_DATA_LAYER}

gtag('consent', 'default', {
  'analytics_storage': 'denied'
});
`

const DefaultLayout: FC = ({ children }) => {
	const [cookies, setCookie, removeCookie] = useCookies(['cookie-consent'])

	useEffect(() => { console.log(cookies['cookie-consent']) }, [ cookies ])

	return (
		<div className="text-dark-blue">
			<Head>		
				<title>15zisif.cz</title>
				<link rel="icon" href="/favicon.ico" />
				{ process.env.NODE_ENV === 'production' && <script dangerouslySetInnerHTML={{ __html: GA_SCRIPT_DEFAULT }} />}
				<script async src="https://www.googletagmanager.com/gtag/js?id=UA-198544478-1" />

				{ process.env.NODE_ENV === 'production' && <script dangerouslySetInnerHTML={{ __html: `
                    window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
				  
					gtag('config', 'UA-198544478-1');

					${cookies['cookie-consent']?.analytics ? `
					gtag('consent', 'update', {
					  'analytics_storage': 'granted'
					});
					` : ``}
                `} }/>}
				
				<script type="application/ld+json" dangerouslySetInnerHTML={{
					__html: `{ "@context": "https://schema.org/", "@type": "CreativeWorkSeries", "name": "Post title", "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "bestRating": "5", "ratingCount": "14" } }`
				}}/>
				
			</Head>
			<TopBar />
			<Navigation />
			{children}
			<Footer />
			<CookieBar />
		</div>
	)
}

export default DefaultLayout

import Head from 'next/head'
import React, { FC, useEffect } from 'react'
import Footer from '../components/Layout/Footer'
import Navigation from '../components/Layout/Navigation'
import CookieBar from '../components/Layout/CookieBar'
import { useCookies } from 'react-cookie'

const GA_ID = 'G-S807KT9017'

const GA_DATA_LAYER = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}`

const GA_SCRIPT_DEFAULT = `
${GA_DATA_LAYER}

gtag('consent', 'default', {
  'analytics_storage': 'denied'
});
`

const GTM_SCRIPT = `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KZQQ7GWB');
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
				<script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />

				{ process.env.NODE_ENV === 'production' && <script dangerouslySetInnerHTML={{ __html: `
                    window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
				  
					gtag('config', '${GA_ID}');

					${cookies['cookie-consent']?.analytics ? `
					gtag('consent', 'update', {
					  'analytics_storage': 'granted'
					});
					` : ``}
                `} }/>}
				
				<script dangerouslySetInnerHTML={{ __html: GTM_SCRIPT }} />

				<script type="application/ld+json" dangerouslySetInnerHTML={{
					__html: `{ "@context": "https://schema.org/", "@type": "CreativeWorkSeries", "name": "Post title", "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "bestRating": "5", "ratingCount": "43" } }`
				}}/>
				
			</Head>
			<Navigation />
			{children}
			<Footer />
			<CookieBar />
			<noscript>
				<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KZQQ7GWB" height="0" width="0" style={{ display: "none", visibility: "hidden" }} />
			</noscript>
		</div>
	)
}

export default DefaultLayout

import Head from 'next/head'
import React, { FC, useEffect } from 'react'
import Footer from '../components/Layout/Footer'
import Navigation from '../components/Layout/Navigation'
import CookieBar from '../components/Layout/CookieBar'
import { useCookies } from 'react-cookie'

// Measurement ID of this site's own GA4 property.
// Until NEXT_PUBLIC_GA_ID is set in Vercel, no analytics is loaded at all.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID

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

	return (
		<div className="text-dark-blue">
			<Head>		
				<title>pravoprosmenarny.cz</title>
				<link rel="icon" href="/favicon.ico?v=2" sizes="any" />
				<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
				<meta name="theme-color" content="#110756" />
				{ GA_ID && process.env.NODE_ENV === 'production' && <script dangerouslySetInnerHTML={{ __html: GA_SCRIPT_DEFAULT }} />}
				{ GA_ID && process.env.NODE_ENV === 'production' && <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />}

				{ GA_ID && process.env.NODE_ENV === 'production' && <script dangerouslySetInnerHTML={{ __html: `
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
				
				{/* Structured data describing the firm. Deliberately without aggregateRating:
				    Google does not show stars for self-serving ratings and forbids aggregating
				    ratings from other sites. Real reviews are displayed on the pages themselves. */}
				<script type="application/ld+json" dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'LegalService',
						name: 'PEERS advokátní kancelář, s.r.o.',
						description: 'Právní služby pro směnárny – založení směnárny, povolení ČNB, AML compliance a příprava na kontrolu ČNB.',
						url: 'https://www.pravoprosmenarny.cz',
						email: 'matyas.moska@peers.law',
						telephone: '+420605006807',
						vatID: 'CZ22096973',
						address: {
							'@type': 'PostalAddress',
							streetAddress: 'Hvězdova 1716/2b',
							addressLocality: 'Praha',
							postalCode: '140 00',
							addressCountry: 'CZ',
						},
						areaServed: 'CZ',
						availableLanguage: ['cs', 'en', 'de'],
						sameAs: ['https://www.peers.law', 'https://www.linkedin.com/company/81336235/'],
					})
				}}/>
				
			</Head>
			<Navigation />
			{children}
			<Footer />
			<CookieBar />
		</div>
	)
}

export default DefaultLayout

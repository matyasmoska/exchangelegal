import React from 'react'
import DefaultLayout from '../layouts/DefaultLayout'
import SEO from '../components/Layout/SEO'
import ContactSection from '../components/Pages/index/ContactSection'
import { GetStaticProps, NextPage } from 'next'
import { fetchEntries } from '../services/contentful'
import NewsSection from '../components/Pages/index/NewsSection'
import ArgumentsSection from '../components/Pages/index/ArgumentsSection'
import { NewsItem } from '../typings'
import PartnersSection from '../components/Pages/index/PartnersSection'
import { c } from '../services/misc'
import { Fade } from 'react-awesome-reveal'
import NewsBar from '../components/Pages/index/NewsBar'
import Image from 'next/image'
import MainCarousel from '../components/Pages/index/MainCarousel'
import PathChooser from '../components/Pages/index/PathChooser'


const Home: NextPage<{ news: NewsItem[] }> = ({ news }) => {
	return (
		<DefaultLayout>
			
			<SEO
				title="Založení směnárny na klíč | pravoprosmenarny.cz"
				description="✅ Jsme odborníky na směnárny – založení směnárny na klíč, povolení ČNB, AML compliance, reporting a příprava na kontrolu ČNB ⭐"
				keywords="směnárna, založení směnárny, povolení k činnosti směnárníka, ČNB, AML, směnárenská činnost"
			/>
			
			<meta name="seznam-wmt" content="dvWBun9gVdKXbODiGWoQ7fhRwJ0xE2Ni" />
			
			<div className="relative">
				<MainCarousel news={news} />
				<PathChooser />
				<ArgumentsSection />
				<NewsSection news={news} />
				<Fade direction={'up'} triggerOnce>
					<ContactSection />
				</Fade>
				<Fade direction={'up'} cascade triggerOnce>
					<PartnersSection />
				</Fade>
			</div>
		</DefaultLayout>
	)
}

export const getStaticProps: GetStaticProps = async (context) => {
	const res = await fetchEntries()

	const news = res.filter((n: any)=> n.fields.slug).map((n: any) => {
		
		return n.fields
	})

	return {
		props: {
			news
		}
	}
}

export default Home

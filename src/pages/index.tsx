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
				title={{ cs: "Založení směnárny na klíč | pravoprosmenarny.cz", en: "Turnkey Exchange Office Setup | pravoprosmenarny.cz" }}
				description={{ cs: "✅ Jsme odborníky na směnárny – založení směnárny na klíč, povolení ČNB, AML compliance, reporting a příprava na kontrolu ČNB ⭐", en: "✅ We are experts on bureaux de change – turnkey setup, CNB licence, AML compliance, reporting and inspection readiness ⭐" }}
				keywords={{ cs: "směnárna, založení směnárny, povolení k činnosti směnárníka, ČNB, AML, směnárenská činnost", en: "exchange office, bureau de change, CNB licence, AML, currency exchange, Czech Republic" }}
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

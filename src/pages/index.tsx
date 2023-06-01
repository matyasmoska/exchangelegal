import React from 'react'
import HeroSection from '../components/Pages/index/HeroSection'
import DefaultLayout from '../layouts/DefaultLayout'
import SEO from '../components/Layout/SEO'
import ContactSection from '../components/Pages/index/ContactSection'
import { GetStaticProps, NextPage } from 'next'
import { fetchEntries } from '../services/contentful'
import NewsSection from '../components/Pages/index/NewsSection'
import { NewsItem } from '../typings'
import PartnersSection from '../components/Pages/index/PartnersSection'
import { c } from '../services/misc'
import { Fade } from 'react-awesome-reveal'
import NewsBar from '../components/Pages/index/NewsBar'
import Image from 'next/image'
import MainCarousel from '../components/Pages/index/MainCarousel'


const Home: NextPage<{ news: NewsItem[] }> = ({ news }) => {
	return (
		<DefaultLayout>
			
			<SEO
				title="ZISIF 15 – alternativní fondy na klíč | 15zisif.cz"
				description="✅ Jsme odborníky na ZISIF 15, věnujeme se zakládání alterantivních fondů ⭐ Máme unikátní zkušenosti a know-how v oblasti alternativních fondů dle ZISIF 15"
				keywords="ZISIF 15, alternativní investiční fond, minifond, alternativní fond, § 15 ZISIF, 15zisif"
			/>
			
			<meta name="seznam-wmt" content="dvWBun9gVdKXbODiGWoQ7fhRwJ0xE2Ni" />
			
			<div className="relative">
				<MainCarousel news={news} />
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

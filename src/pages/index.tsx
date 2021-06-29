import React from 'react'
import HeroSection from '../components/Pages/index/HeroSection'
import DefaultLayout from '../layouts/DefaultLayout'
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

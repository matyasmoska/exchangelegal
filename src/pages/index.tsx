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
import Image from 'next/image'

const Home: NextPage<{ news: NewsItem[] }> = ({ news }) => {
	return (
		<DefaultLayout>
			<div className="relative">
				<div className="absolute top-0 z-20 w-full py-3 text-center bg-white text-dark-blue bg-opacity-70">
					<span className="font-bold">1. Ledna 2021 - Nabytí zástavního práva</span>
				</div>
				<div
					className={c("relative w-full h-screen bg-cover px-36 pt-36", 'md:px-5 md:pt-24')}
				>
					<Image src={'/images/background.png'} priority className="absolute top-0 left-0 z-0" layout="fill" objectFit="cover" />
					<div className={c(
						"absolute top-0 left-0 z-10 w-full h-full from-dark-blue via-[#021C62A6] bg-gradient-to-r to-transparent",
						'md:to-dark-blue md:opacity-80'
					)} />
					<HeroSection />
				</div>
				<NewsSection news={news} />
				<ContactSection />
				<PartnersSection />
			</div>
		</DefaultLayout>
	)
}

export const getStaticProps: GetStaticProps = async (context) => {
	const res = await fetchEntries()

	const news = res.map((n: any) => {
		return n.fields
	})

	return {
		props: {
			news
		}
	}
}

export default Home

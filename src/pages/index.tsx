import React from 'react'
import HeroSection from '../components/Pages/index/HeroSection'
import DefaultLayout from '../layouts/DefaultLayout'
import ContactSection from '../components/Pages/index/ContactSection'
import { GetStaticProps, NextPage } from 'next'
import { fetchEntries } from '../services/contentful'
import NewsSection from '../components/Pages/index/NewsSection'
import { NewsItem } from '../typings'
import PartnersSection from '../components/Pages/index/PartnersSection'
import { c, dateStringToDateFormat } from '../services/misc'
import Image from 'next/image'
import { Fade } from 'react-awesome-reveal'
import Link from 'next/link'

const Home: NextPage<{ news: NewsItem[] }> = ({ news }) => {
	return (
		<DefaultLayout>
			<div className="relative">
				<div className="absolute top-0 z-20 w-full py-3 text-center bg-white text-dark-blue bg-opacity-70">
					<Link href={'/news/' + news[0].slug}>
						<a>
							<span className="font-bold">{`${dateStringToDateFormat(news[0].date)} - ${news[0]
								.name}`}</span>
						</a>
					</Link>
				</div>
				<div className={c('relative flex w-full bg-cover px-36 py-36 pt-24', '3xl:px-28', 'md:px-5 md:pt-24')}>
					
					<img
						src={'/images/background2.png'}
						alt="Background Image"
						className="absolute top-0 left-0 z-0 w-full h-full"
					/>
					<div
						className={c(
							'absolute top-0 left-0 z-10 w-full h-full from-dark-blue via-[#021C62A6] bg-gradient-to-r to-transparent',
							'md:to-dark-blue md:opacity-80'
						)}
					/>
					<HeroSection />
				</div>
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

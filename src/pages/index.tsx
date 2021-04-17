import React from 'react'
import HeroSection from '../components/Pages/index/HeroSection'
import DefaultLayout from '../layouts/DefaultLayout'
import ContactSection from '../components/Pages/index/ContactSection'
import { GetStaticProps, NextPage } from 'next'
import { fetchEntries } from '../services/contentful'
import { RichTextData, RichTextNodeType } from 'contentful'
import NewsSection from '../components/Pages/index/NewsSection'

const Home: NextPage<{ news: NewsItem[] }> = ({ news }) => {
  console.log('NEWS', news)

	return (
		<DefaultLayout>
			<div className="relative">
				<div className="absolute top-0 z-10 w-full py-3 text-center bg-white text-dark-blue bg-opacity-70">
					<span className="font-bold">1. Ledna 2021 - Nabytí zástavního práva</span>
				</div>
				<div
					className="relative w-full h-screen bg-cover px-36 pt-36"
					style={{ backgroundImage: "url('./images/background.png')" }}
				>
					<div className="absolute top-0 left-0 z-0 w-full h-full from-dark-blue via-[#021C62A6] bg-gradient-to-r to-transparent" />
					<HeroSection />
				</div>
        <NewsSection news={news} />
				<ContactSection />
			</div>
		</DefaultLayout>
	)
}

export interface NewsItem {
  name: string
  text: RichTextData
  date: string,
  previewText: string
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

export default Home;
import React, { FC } from 'react'
import { Fade } from 'react-awesome-reveal'
import { c } from '../../../services/misc'
import { NewsItem } from '../../../typings'
import NewsPreviewItem from '../news/NewsPreviewItem'
import { useTranslations } from '../../../hooks/useTranslations'
import pageData from '../../../data/navigation.json'

const NewsSection: FC<{ news: NewsItem[] }> = ({ news }) => {
	const t = useTranslations()
	
	return (
		<div className={c('w-full space-y-16 mt-24 px-36', '3xl:px-28', '2xl:px-20', 'md:px-8')}>
			<Fade direction={'up'} triggerOnce>
				<h2 className="text-4xl font-bold text-center">{t(pageData.news)}</h2>
			</Fade>
			<div className={c('grid grid-cols-3 gap-16', 'md:flex md:flex-col md:space-y-6 md:text-center')}>
				<Fade damping={0.5} duration={500} cascade triggerOnce>
					{news.slice(0, 3).map((newsItem) => <NewsPreviewItem key={newsItem.name} newsItem={newsItem} />)}
				</Fade>
			</div>
		</div>
	)
}

export default NewsSection

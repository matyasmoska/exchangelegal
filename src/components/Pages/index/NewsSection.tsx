import React, { FC } from 'react'
import { Fade } from 'react-awesome-reveal'
import { c } from '../../../services/misc'
import { NewsItem } from '../../../typings'
import NewsPreviewItem from '../news/NewsPreviewItem'

const NewsSection: FC<{ news: NewsItem[] }> = ({ news }) => {
	return (
		<div className={c('w-full space-y-16 mt-36 px-36', '3xl:px-28', '2xl:px-20', 'md:px-8')}>
			<Fade direction={'up'} triggerOnce>
				<h2 className="text-4xl font-bold text-center">Aktuality</h2>
			</Fade>
			<div className={c('grid grid-cols-3 gap-16', 'md:flex md:flex-col md:space-y-6 md:text-center')}>
				<Fade damping={0.5} duration={500} cascade triggerOnce>
					{news.map((newsItem) => <NewsPreviewItem key={newsItem.name} newsItem={newsItem} />)}
				</Fade>
			</div>
		</div>
	)
}

export default NewsSection

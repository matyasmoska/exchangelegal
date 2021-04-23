import React, { FC } from 'react'
import { c } from '../../../services/misc'
import { NewsItem } from '../../../typings'
import NewsPreviewItem from '../news/NewsPreviewItem'

const NewsSection: FC<{ news: NewsItem[] }> = ({ news }) => {
	return (
		<div className={c('w-full space-y-16 mt-36 px-36', '3xl:px-28', '2xl:px-20', 'md:px-8')}>
			<h2 className="text-4xl font-bold text-center">Aktuality</h2>
			<div className={c('grid grid-cols-3 gap-16', 'md:flex md:flex-col md:space-y-6 md:text-center')}>
				{news.map((newsItem) => <NewsPreviewItem key={newsItem.name} newsItem={newsItem} />)}
			</div>
		</div>
	)
}

export default NewsSection

import { FC } from 'react'
import { c, dateStringToDateFormat } from '../../../services/misc'
import { NewsItem } from '../../../typings'
import Button from '../../Layout/Button'

const NewsPreviewItem: FC<{ newsItem: NewsItem }> = ({ newsItem }) => {
	return (
		<div className="space-y-10">
			<div className="space-y-3">
				<p className="text-sm">{dateStringToDateFormat(newsItem.date)}</p>
				<h3 className="text-3xl font-bold">{newsItem.name}</h3>
			</div>
			<p className="md:hidden">{newsItem.previewText}</p>
			<div className="md:hidden">
				<Button type="basic" className="float-left px-16 py-2 text-white">
					Více
				</Button>
			</div>
		</div>
	)
}

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

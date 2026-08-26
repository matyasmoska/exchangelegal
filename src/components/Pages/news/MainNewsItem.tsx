import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'
import React, { FC, useMemo } from 'react'
import readingTime from 'reading-time'
import { c, dateStringToDateFormat } from '../../../services/misc'
import { NewsItem } from '../../../typings'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Button from '../../Layout/Button'
import ReadingTime from './ReadingTime'
import { Locale, useTranslations } from '../../../hooks/useTranslations'
import pageData from '../../../data/news.json'

const MainNewsItem: FC<{ newsItem: NewsItem }> = ({ newsItem }) => {
	const { locale, defaultLocale = "cs" } = useRouter()
	const t = useTranslations<any>()

	const stats = useMemo(() => readingTime(documentToPlainTextString(t(newsItem.text))), [ newsItem ])

	return (
		<div className={c('grid grid-cols-2 gap-8', 'md:flex md:flex-col md:space-x-0 md:space-y-4')}>
			<div className="relative">
				<Image
					className="z-10"
					layout="fill"
					objectFit="cover"
					quality={90}
					priority
					src={'https:' + encodeURI(t(t(newsItem.thumbnail).fields.file).url)}
				/>
				<div className="absolute top-0 left-0 w-full h-full transition transform bg-gray-400 animate-pulse" />
			</div>
			<div className="flex flex-col space-y-12 text-left">
				<div className="flex flex-col space-y-4">
					<Link href={'/aktuality/' + newsItem.slug[defaultLocale as Locale]}>
						<h1 className={c('text-[40px] leading-tight font-bold cursor-pointer', 'xl:text-3xl', 'md:text-2xl md:text-center')}>{t(newsItem.name)}</h1>
					</Link>
					<div className={c('flex items-center space-x-12', 'md:justify-center')}>
						<span className={c('md:text-lg')}>{dateStringToDateFormat(newsItem.date[defaultLocale as Locale] as string, locale)}</span>
						<ReadingTime stats={stats} />
					</div>
					<p className="text-justify">{t(newsItem.previewText)}</p>
				</div>
				<div className={c('flex', 'md:justify-center')}>
					<Link href={'/aktuality/' + newsItem.slug[defaultLocale as Locale]}>
						<Button type="basic" className="float-left px-20 py-2.5 text-white">
							{t(pageData.more)}
						</Button>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default MainNewsItem

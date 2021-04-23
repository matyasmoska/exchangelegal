import DefaultLayout from '../../layouts/DefaultLayout';
import Head from 'next/head'
import { GetStaticProps } from 'next';
import { fetchEntries } from '../../services/contentful';
import { NewsItem } from '../../typings';
import { FC, useMemo } from 'react';
import Image from 'next/image'
import { dateStringToDateFormat } from '../../services/misc';
import readingTime from 'reading-time'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import React from 'react';
import { NewsPreviewItem } from '../../components/Pages/index/NewsSection';
import Link from 'next/dist/client/link';
import Button from '../../components/Layout/Button';

const MainNewsItem: FC<{ newsItem: NewsItem }> = ({ newsItem }) => {
  const stats = useMemo(() => readingTime(documentToPlainTextString(newsItem.text)), [newsItem]);

  return (
    <div className="grid grid-cols-2 gap-8 space-x-4">
      <div className="relative">
          <Image width={802} height={433} className="z-10" layout="responsive" objectFit="cover" quality={90} priority src={'https:' + newsItem.thumbnail.fields.file.url} />
          <div className="absolute top-0 left-0 w-full h-full transition transform bg-gray-400 animate-pulse" />
      </div>
      <div className="flex flex-col space-y-6 text-left">
        <h1 className="text-4xl font-bold">{ newsItem.name }</h1>
        <div className="flex items-center space-x-12">
            <span>{dateStringToDateFormat(newsItem.date)}</span>
            <span className="p-1.5 text-sm font-bold bg-gray-100">{ stats.minutes + ' minut čtení' }</span>
        </div>
        <p>
          { newsItem.previewText }
        </p>
        <div className="flex">
          <Link href={ '/news/' + newsItem.slug }>
  					<Button type="basic" className="float-left px-20 py-2.5 text-white">
  						Více
  					</Button>
  				</Link>
        </div>
      </div>
    </div>
  )
}

export default function NewsPage({ news }: { news: NewsItem[] }) {
  return (
    <DefaultLayout>
      <div className="p-36 space-y-28">
        <MainNewsItem newsItem={news[0]} />

        <div className="grid grid-cols-3 gap-12">
          {news.slice(1).map((item: NewsItem) => <NewsPreviewItem key={item.name} newsItem={item} />)}
        </div>
        
      </div>
    </DefaultLayout>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
	const res = await fetchEntries()

	const news = res?.map((n: any) => {
		return n.fields
	})

	return {
		props: {
			news
		}
	}
}
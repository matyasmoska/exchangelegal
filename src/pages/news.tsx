import DefaultLayout from '../layouts/DefaultLayout';
import Head from 'next/head'
import { GetStaticProps } from 'next';
import { fetchEntries } from '../services/contentful';
import { NewsItem } from '../typings';
import { FC, useMemo } from 'react';
import Image from 'next/image'
import { dateStringToDateFormat } from '../services/misc';
import readingTime from 'reading-time'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';

const MainNewsItem: FC<{ newsItem: NewsItem }> = ({ newsItem }) => {
  const stats = useMemo(() => readingTime(documentToPlainTextString(newsItem.text)), [newsItem]);
  console.log(newsItem)

  return (
    <div className="flex space-x-4">
      <div className="">
        <img src={newsItem.thumbnail.fields.file.url} alt="thumbnail" className="px-26" />
      </div>
      <div className="flex flex-col space-y-6 text-left">
        <h1 className="text-4xl font-bold">{ newsItem.name }</h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span>{dateStringToDateFormat(newsItem.date)}</span>
          </div>
          <span className="p-1.5 text-sm font-bold bg-gray-100">{ stats.minutes + 'minut čtení' }</span>
        </div>
        <p>
          { newsItem.previewText }
        </p>
      </div>
    </div>
  )
}

export default function NewsPage({ news }: { news: NewsItem[] }) {
  return (
    <DefaultLayout>
      <div className="text-center p-36">
        <MainNewsItem newsItem={news[0]} />
      </div>
    </DefaultLayout>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
	const res = await fetchEntries()

	const news = res?.map((n) => {
		return n.fields
	})

	return {
		props: {
			news
		}
	}
}
import DefaultLayout from '../../layouts/DefaultLayout';
import SEO from '../../components/Layout/SEO';
import { GetStaticProps } from 'next';
import { fetchEntries } from '../../services/contentful';
import { NewsItem } from '../../typings';
import React from 'react';
import MainNewsItem from '../../components/Pages/news/MainNewsItem';
import NewsPreviewItem from '../../components/Pages/news/NewsPreviewItem';
import { c } from '../../services/misc';

export default function NewsPage({ news }: { news: NewsItem[] }) {
  return (
    <DefaultLayout>
      <SEO
        title="15zisif.cz"
        description="Minifondy na klíč"
        keywords="Minifondy, alternativní fondy, 15 zisif"
      />
      <div className={c("p-36 py-16 space-y-28", "md:px-4 md:space-y-10 md:py-4")}>
        <MainNewsItem newsItem={news[0]} />

        <div className={c("grid grid-cols-3 gap-16", "md:flex md:flex-col md:space-y-16 md:text-center md:gap-0 md:pb-8")}>
          {news.slice(1).map((item: NewsItem) => <NewsPreviewItem key={item.name} newsItem={item} />)}
        </div>
      </div>
    </DefaultLayout>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
	const res = await fetchEntries()

	const news = res?.filter((n: any)=> n.fields.slug).map((n: any) => {
		return n.fields
	})

	return {
		props: {
			news
		}
	}
}

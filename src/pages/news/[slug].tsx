import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React, { useMemo } from "react";
import readingTime from "reading-time";
import DefaultLayout from "../../layouts/DefaultLayout";
import { fetchEntries } from "../../services/contentful";
import { dateStringToDateFormat } from "../../services/misc";
import { NewsItem } from "../../typings";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Image from 'next/image'
import ReadingTime from "../../components/Pages/news/ReadingTime";
import NewsPreviewItem from "../../components/Pages/news/NewsPreviewItem";

interface PostDetailPageProps {
    news: NewsItem[]
    newsItem: NewsItem
}

const PostDetailPage: NextPage<PostDetailPageProps> = ({ news, newsItem }) => {
    const stats = useMemo(() => readingTime(documentToPlainTextString(newsItem.text)), [newsItem]);

    return (
        <DefaultLayout>
            <div className="relative">
                <Image width={1920} height={439} className="z-10" layout="responsive" objectFit="cover" quality={90} priority src={'https:' + newsItem.thumbnail.fields.file.url} />
                <div className="absolute top-0 left-0 w-full h-full transition transform bg-gray-400 animate-pulse" />
            </div>
            <div className="p-24 px-32">
                <div className="grid gap-20" style={{ gridTemplateColumns: '2fr 1fr'}}>
                    <div className="space-y-10">
                        <div className="space-y-5">
                            <h1 className="text-3xl font-bold">{ newsItem.name }</h1>
                            <div className="flex items-center space-x-12">
                                <span>{dateStringToDateFormat(newsItem.date)}</span>
                                <ReadingTime stats={stats} />
                            </div>
                            <article className="space-y-8 prose text-justify max-w-none">
                                { documentToReactComponents(newsItem.text) }
                            </article>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-28">
                        { news.filter( item => item.slug !== newsItem.slug ).map(item => (
                            <NewsPreviewItem newsItem={item} />
                        ))}
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const res = await fetchEntries()

	const news = res?.map((n: any) => {
		return n.fields
	})

	return {
		props: {
            newsItem: news.find((item: NewsItem) => item.slug === params?.slug),
			news
		}
	}
}

export const getStaticPaths: GetStaticPaths = async () => {
    const res = await fetchEntries()

	const news = res?.map((n: any) => {
		return n.fields
	})

    return {
        paths: [
            ...news.map((item: NewsItem) => { return { params: { slug: item.slug } } } )
        ],
        fallback: false
    }
}
  

export default PostDetailPage;
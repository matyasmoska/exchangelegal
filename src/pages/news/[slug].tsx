import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import React, { useMemo } from "react";
import readingTime from "reading-time";
import DefaultLayout from "../../layouts/DefaultLayout";
import { fetchEntries } from "../../services/contentful";
import { c, dateStringToDateFormat } from "../../services/misc";
import { NewsItem } from "../../typings";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Image from 'next/image'
import ReadingTime from "../../components/Pages/news/ReadingTime";
import NewsPreviewItem from "../../components/Pages/news/NewsPreviewItem";
import { useMediaQueries } from "../../hooks/useMediaQueries";

interface PostDetailPageProps {
    news: NewsItem[]
    newsItem: NewsItem
}

const PostDetailPage: NextPage<PostDetailPageProps> = ({ news, newsItem }) => {
    const stats = useMemo(() => readingTime(documentToPlainTextString(newsItem.text)), [newsItem]);
    const { isMd, isLg } = useMediaQueries()

    return (
        <DefaultLayout>
            <div className="relative">
                <Image 
                    width={isLg ? 331 : 1920} 
                    height={isLg ? 200 :  439} 
                    className="z-10" layout="responsive" objectFit="cover" quality={90} priority src={'https:' + newsItem.thumbnail.fields.file.url} />
                <div className="absolute top-0 left-0 w-full h-full transition transform bg-gray-400 animate-pulse" />
            </div>
            <div className={c("p-24 px-32", "md:px-4 md:py-8")}>
                <div className="grid gap-20" style={{ gridTemplateColumns: isMd ? '1fr' : '2fr 1fr' }}>
                    <div className="space-y-10">
                        <div className="space-y-5">
                            <h1 className={c("text-3xl font-bold", "md:text-center")}>{ newsItem.name }</h1>
                            <div className="flex items-center space-x-12">
                                <span>{dateStringToDateFormat(newsItem.date)}</span>
                                <ReadingTime stats={stats} />
                            </div>
                            <article className="space-y-8 prose text-justify max-w-none">
                                { documentToReactComponents(newsItem.text) }
                            </article>
                        </div>
                    </div>
                    <div className={c("flex flex-col space-y-28", 'md:space-y-8 md:text-center')}>
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
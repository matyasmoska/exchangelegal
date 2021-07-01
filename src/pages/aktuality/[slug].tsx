import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import React, { useMemo } from "react";
import readingTime from "reading-time";
import DefaultLayout from "../../layouts/DefaultLayout";
import { fetchEntries } from "../../services/contentful";
import { c, dateStringToDateFormat } from "../../services/misc";
import { Author, NewsItem } from "../../typings";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Image from 'next/image'
import ReadingTime from "../../components/Pages/news/ReadingTime";
import NewsPreviewItem from "../../components/Pages/news/NewsPreviewItem";
import { useMediaQueries } from "../../hooks/useMediaQueries";
import { INLINES } from '@contentful/rich-text-types'
import ShareArticleLinks from "../../components/Pages/news/ShareArticleLinks";
import { NextSeo } from "next-seo";

interface PostDetailPageProps {
    news: NewsItem[]
    newsItem: NewsItem,
    author?: Author
}

let options = {
    renderNode: {
        'embedded-asset-block': (node: any) => (
            <div className="relative w-full my-10">
                <img  className="img-fluid" src={'https:' + node.data.target.fields.file.url} />
            </div>
        ),
        [INLINES.HYPERLINK]: (node: any) => {
            if (node.data.uri.indexOf('youtube.com') !== -1) {
                return (
                    <div className="video">
                        <iframe
                            id="ytplayer"
                            width="100%"
                            height="480"
                            src={node.data.uri}
                            frameBorder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture ; fullscreen"
                        />
                    </div>
                );
            } else {
                return (
                    <a href={node.data.uri}>
                        {node.content[0].value}
                    </a>
                );
            }
        }
    }
}

const PostDetailPage: NextPage<PostDetailPageProps> = ({ news, newsItem, author }) => {
    const { isMd, isLg } = useMediaQueries()
    
    const stats = useMemo(() => readingTime(documentToPlainTextString(newsItem.text)), [newsItem]);

    return (
        <DefaultLayout>
            <NextSeo
                title={newsItem.name + ' | AML solutions'}
                description={newsItem.previewText}
                openGraph={{
                    url: 'https://amlsolutions.cz/news/' + newsItem.slug,
                    title: newsItem.name + ' | AML solutions',
                    description: newsItem.previewText,
                    site_name: 'AML solutions',
                    type: 'article',
                    article: {
                        publishedTime: newsItem.date
                    },
                    images: [
                        {
                            url: 'https:' + newsItem.thumbnail.fields.file.url,
                            width: 1920,
                            height: 439
                        }
                    ]
                }}
                twitter={{
                    handle: '@solutions_aml',
                    site: '@solutions_aml',
                    cardType: 'summary_large_image'
                }}
            />
            <div className="relative">
                <Image 
                    width={isLg ? 331 : 1920} 
                    height={isLg ? 200 :  439} 
                    className="z-10" layout="responsive" objectFit="cover" quality={90} priority src={'https:' + newsItem.thumbnail.fields.file.url} />
                <div className="absolute top-0 left-0 w-full h-full transition transform bg-gray-400 animate-pulse" />
            </div>
            <div className={c("p-24 flex justify-center", "md:px-4 md:py-8")}>
                <div className={c("flex justify-center space-x-20", "md:flex-col md:space-x-0 md:space-y-20")}>
                    <div className="max-w-4xl space-y-10">
                        <div className="space-y-5">
                            <h1 className={c("text-3xl font-bold", "md:text-center")}>{ newsItem.name }</h1>
                            <div className="flex items-center space-x-12">
                                <span>{dateStringToDateFormat(newsItem.date)}</span>
                                <ReadingTime stats={stats} />
                            </div>
                            <article className="space-y-8 prose text-justify max-w-none">
                                { documentToReactComponents(newsItem.text, options) }
                            </article>
                           <div className="flex items-center justify-between">
                               { author && <div className="flex items-center space-x-4">
                                    <Image 
                                        width={64} 
                                        height={64}
                                        priority 
                                        className="z-10 rounded-full" 
                                        objectFit="cover"
                                        src={'https:' + author.photo.fields.file.url} 
                                    />
                                    <div className="flex flex-col space-y-0.5">
                                        <h4 className="text-lg font-bold">{ author.name }</h4>
                                        <p className="text-gray-400">{ author.title }</p>
                                    </div>
                                </div> }
                                <ShareArticleLinks article={newsItem} />
                           </div>
                        </div>
                    </div>
                    <div className={c("flex flex-col space-y-28 max-w-lg", 'md:space-y-8 md:text-center')}>
                        { news.filter( item => item.slug !== newsItem.slug ).map(item => (
                            <NewsPreviewItem key={item.slug} newsItem={item} />
                        ))}
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const res = await fetchEntries()

	const news = res?.filter((n: any)=> n.fields.slug).map((n: any) => {
		return n.fields
	})

    const currentArticle = news.find((item: NewsItem) => item.slug === params?.slug)

	return {
		props: {
            newsItem: currentArticle,
			news,
            author: currentArticle.author?.fields || null
		}
	}
}

export const getStaticPaths: GetStaticPaths = async () => {
    const res = await fetchEntries()

	const news = res?.filter((n: any)=> n.fields.slug).map((n: any) => {
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
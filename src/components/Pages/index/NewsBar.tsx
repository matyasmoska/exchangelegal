import { AnimatePresence, AnimateSharedLayout, motion as m } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useMemo, useState } from 'react'
import { c, dateStringToDateFormat } from '../../../services/misc'
import { Locale, useTranslations } from '../../../hooks/useTranslations'
import { NewsItem } from '../../../typings'
import config from '../../../data/pages/index.json'

/*
    News item bar on the first page, first few items are taken and toggled between.
    Config can be found on pages/index.json
*/

const NewsBar: FC<{ news: NewsItem[] }> = ({ news }) => {
    const { locale, defaultLocale = "cs" } = useRouter()
    const t = useTranslations()

    const [currentItemIndex, setCurrentItemIndex] = useState(0)

    // Take only first five articles
    news = news.slice(0, config.newsBar.howManyArticles)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentItemIndex(( c ) => {
                if ( c < news.length - 1 ) return c + 1
                else return 0
            })
        }, config.newsBar.betweenArticlesDelaySeconds * 1000)

        // Clear interval after killing the component
        return () => clearInterval(interval)
    }, []);
    
    // Memoize current news item
    const currNewsItem = useMemo(() => news[currentItemIndex], [currentItemIndex])

	return (
		<AnimateSharedLayout>
		  <m.div layout className="absolute top-0 z-20 w-full">
		    <m.div layout className={c("py-3 text-center bg-white text-dark-blue bg-opacity-70", 'md:px-3')}>
    			<AnimatePresence initial={false} exitBeforeEnter>
    			    <m.div
                        layout 
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 20, opacity: 0 }}
                        transition={{ duration: 0.4, type: 'tween'}}
                        key={currNewsItem.slug[defaultLocale as Locale]}
                    >
        			    <Link href={'/aktuality/' + currNewsItem.slug[defaultLocale as Locale]}>
            				<a>
            					<span className="font-bold">{`${dateStringToDateFormat(currNewsItem.date[defaultLocale as Locale] as string, locale)} – ${t(currNewsItem.name)}`}</span>
            				</a>
            			</Link>
        			</m.div>
    			</AnimatePresence>
    		</m.div>
    	  </m.div>
		</AnimateSharedLayout>
	)
}

export default NewsBar

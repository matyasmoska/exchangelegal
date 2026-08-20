import React, { FC, useEffect, useState } from 'react'
import { NewsItem } from '../../../typings'
import { FacebookIcon, TwitterIcon, LinkedInIcon } from '../../Layout/Icons'
// @ts-ignore
import ShareLink from 'react-facebook-share-link'
import { FacebookShareButton, LinkedinShareButton } from 'react-share'
import { useRouter } from 'next/router'
import { Locale, useTranslations } from '../../../hooks/useTranslations'

import pageData from '../../../data/news.json'

const ShareArticleLinks: FC<{ article: NewsItem }> = ({ article }) => {
	const { locale, defaultLocale = "cs" } = useRouter()
	const t = useTranslations<string>()
	const [twitterLink, setTwitterLink] = useState('')

	useEffect(() => {
		setTwitterLink('https://twitter.com/intent/tweet?text=' + encodeURI(`${t(article.name)} ${window?.location.href}`))
	}, [])

	const url = encodeURI(`https://www.smenarny.legal/${locale && locale !== defaultLocale ? `${locale}/` : ''}aktuality/${article.slug[defaultLocale as Locale]}`)

	return (
		<div className="flex items-center space-x-4">
			<span className="text-sm">{t(pageData.share)}:</span>
			<div className="flex items-center space-x-2">
				<FacebookShareButton url={url}>
					<FacebookIcon className="fill-current w-7 h-7" />
				</FacebookShareButton>
				<a href={twitterLink} aria-label="Twitter Link" target="_blank">
					<TwitterIcon className="fill-current w-7 h-7" />
				</a>
				<LinkedinShareButton
					title={t(article.name)}
					source="smenarny.legal"
					url={url}
				>
					<LinkedInIcon className="fill-current w-7 h-7" />
				</LinkedinShareButton>
			</div>
		</div>
	)
}

export default ShareArticleLinks

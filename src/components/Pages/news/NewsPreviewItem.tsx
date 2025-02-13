import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useMemo } from "react";
import readingTime from "reading-time";
import { c, dateStringToDateFormat } from "../../../services/misc";
import { NewsItem } from "../../../typings";
import Button from "../../Layout/Button";
import ReadingTime from "./ReadingTime";
import { useTranslations } from "../../../hooks/useTranslations";
import pageData from '../../../data/news.json';

export const NewsPreviewItem: FC<{ newsItem: NewsItem }> = ({ newsItem }) => {
	const { locale } = useRouter()
	const t = useTranslations()
	
	const stats = useMemo(() => readingTime(documentToPlainTextString(newsItem.text)), [newsItem]);

	return (
		<div className="flex flex-col justify-between h-full space-y-6">
				<Link href={ '/aktuality/' + newsItem.slug }>
					<div className={c("space-y-4", "md:flex md:flex-col-reverse")}>
						<div className={c("flex items-center space-x-12", "md:justify-center md:mt-5")}>
							<span>{dateStringToDateFormat(newsItem.date, locale)}</span>
							<ReadingTime stats={stats} />
			        	</div>
						<h3 className={c("text-3xl font-bold", "md:text-2xl")}>{newsItem.name}</h3>
					</div>
				</Link>
				<p className="text-justify md:hidden">{newsItem.previewText}</p>
			<div className="md:hidden">
				<Link href={ '/aktuality/' + newsItem.slug }>
					<Button type="secondary" className="float-left px-16 py-2">
						{t(pageData.more)}
					</Button>
				</Link>
			</div>
		</div>
	)
}

export default NewsPreviewItem;
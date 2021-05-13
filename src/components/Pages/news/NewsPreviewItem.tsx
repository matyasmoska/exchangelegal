import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import Link from "next/link";
import React, { FC, useMemo } from "react";
import readingTime from "reading-time";
import { c, dateStringToDateFormat } from "../../../services/misc";
import { NewsItem } from "../../../typings";
import Button from "../../Layout/Button";
import ReadingTime from "./ReadingTime";

export const NewsPreviewItem: FC<{ newsItem: NewsItem }> = ({ newsItem }) => {
	const stats = useMemo(() => readingTime(documentToPlainTextString(newsItem.text)), [newsItem]);

	return (
		<div className="space-y-6">
			<Link href={ '/news/' + newsItem.slug }>
				<div className={c("space-y-4", "md:flex md:flex-col-reverse")}>
					<div className={c("flex items-center space-x-12", "md:justify-center md:mt-5")}>
						<span>{dateStringToDateFormat(newsItem.date)}</span>
						<ReadingTime stats={stats} />
		        	</div>
					<h3 className={c("text-3xl font-bold", "md:text-2xl")}>{newsItem.name}</h3>
				</div>
			</Link>
			<p className="text-justify md:hidden">{newsItem.previewText}</p>
			<div className="md:hidden">
				<Link href={ '/news/' + newsItem.slug }>
					<Button type="basic" className="float-left px-16 py-2 text-white">
						Více
					</Button>
				</Link>
			</div>
		</div>
	)
}

export default NewsPreviewItem;
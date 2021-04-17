import { FC } from "react";
import { NewsItem } from "../../../pages";
import { dateStringToDateFormat } from "../../../services/misc";
import Button from "../../Layout/Button";

const NewsPreviewItem: FC<{ newsItem: NewsItem }> = ({ newsItem }) => {
    return (
        <div className="space-y-10">
            <div className="space-y-3">
                <p className="text-sm">{ dateStringToDateFormat( newsItem.date )}</p>
                <h3 className="text-3xl font-bold">{ newsItem.name }</h3>
            </div>
            <p>{ newsItem.previewText }</p>
            <Button type="basic" className="float-left px-16 py-2 text-white">Více</Button>
        </div>
    )
}

const NewsSection: FC<{ news: NewsItem[] }> = ({ news }) => {
    return (
        <div className="w-full space-y-16 mt-36 px-36">
            <h2 className="text-[40px] font-bold text-center">Aktuality</h2>
            <div className="grid grid-cols-3 gap-16">
                {
                    news.map( newsItem => (
                        <NewsPreviewItem key={newsItem.name} newsItem={newsItem} />
                    ))
                }
            </div>
        </div>

    );
}

export default NewsSection;
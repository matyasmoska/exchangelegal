import { RichTextData } from "contentful";

export interface NewsItem {
	name: string
	text: RichTextData
	date: string
	previewText: string
}
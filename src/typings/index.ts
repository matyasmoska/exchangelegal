import { RichTextData } from "contentful";

export interface NewsItem {
	name: string
	text: RichTextData
	date: string
	previewText: string
}

export interface TeamMember {
	name: string
	title: string
	description: string | string[]
	photo: string
}
import { Asset, RichTextContent } from "contentful";

export interface NewsItem {
	name: string
	text: any
	date: string
	previewText: string
	thumbnail: any
}

export interface TeamMember {
	name: string
	title: string
	description: string | string[]
	photo: string
}
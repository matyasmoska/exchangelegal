export interface NewsItem {
	name: string
	text: any
	date: string
	slug: string
	previewText: string
	thumbnail: any
}

export interface TeamMember {
	name: string
	tags: string[]
	description: string | string[]
	photo: string,
	linkedIn?: string
}
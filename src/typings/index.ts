export interface NewsItem {
	name: string
	text: any
	date: string
	slug: string
	previewText: string
	thumbnail: any
}

export interface Author {
	name: string,
	title: string,
	photo: any
}

interface Sanction {
	legal_acts: {
		data: LegalAct[]
	}
}

interface LegalAct {
	url: string
}

export interface SanctionsResult {
	data: Sanction[],
	meta: {
		version: string,
	}
} 

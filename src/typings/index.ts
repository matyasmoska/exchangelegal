import { Translations } from '../hooks/useTranslations'

export interface FAQuestion {
	question: Translations | string
	answer: Translations | string
}

export interface NewsItem {
	name: Translations
	text: any
	date: Translations
	slug: Translations
	previewText: Translations
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

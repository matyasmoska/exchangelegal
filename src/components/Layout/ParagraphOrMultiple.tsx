import React, { FC } from 'react'
import { Translations, useTranslations } from '../../hooks/useTranslations'

export type ParOrMultipleText = Translations | Translations[] | string | string[]

const ParagraphOrMultiple: FC<{ text: ParOrMultipleText; className?: string }> = ({ text, className = '' }) => {
	const t = useTranslations<string>()

	return (
		<>
			{Array.isArray(text) ? (
				text.map((desc) => <p key={t(desc)} className={className} dangerouslySetInnerHTML={{ __html: t(desc) }} />)
			) : (
				<p className={className} dangerouslySetInnerHTML={{ __html: t(text) }} />
			)}
		</>
	)
}

export default ParagraphOrMultiple

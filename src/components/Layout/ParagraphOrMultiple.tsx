import React, { FC } from 'react'
import { Translations, useTranslations } from '../../hooks/useTranslations'

type ParOrMultipleText = Translations | Translations[] | string | string[]

const ParagraphOrMultiple: FC<{ text: ParOrMultipleText; className?: string }> = ({ text, className = '' }) => {
	const t = useTranslations<string>()

	return (
		<>
			{Array.isArray(text) ? (
				text.map((desc) => <p key={t(desc)} className={className}>{t(desc)}</p>)
			) : (
				<p className={className}>{t(text)}</p>
			)}
		</>
	)
}

export default ParagraphOrMultiple

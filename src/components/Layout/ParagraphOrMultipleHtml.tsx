import React, { FC } from 'react'

const ParagraphOrMultipleHtml: FC<{ text: string | string[]; className?: string }> = ({ text, className = '' }) => {
	return (
		<>
			{Array.isArray(text) ? (
				text.map((desc: string) => <p key={desc} className={className} dangerouslySetInnerHTML={{ __html: desc }} />)
			) : (
				<p className={className} dangerouslySetInnerHTML={{ __html: text }} />
			)}
		</>
	)
}

export default ParagraphOrMultipleHtml

import React, { FC } from 'react'

const ParagraphOrMultiple: FC<{ text: string | string[]; className?: string }> = ({ text, className = '' }) => {
	return (
		<>
			{Array.isArray(text) ? (
				text.map((desc: string) => <p key={desc} className={className}>{desc}</p>)
			) : (
				<p className={className}>{text}</p>
			)}
		</>
	)
}

export default ParagraphOrMultiple

import { AnimatePresence, AnimateSharedLayout, motion as m } from 'framer-motion'
import { FC, useEffect, useMemo, useState } from 'react'
import { opacityAnimation } from '../../../animations/navigation'
import { c } from '../../../services/misc'
import { Translations, useTranslations } from '../../../hooks/useTranslations'
import pageData from '../../../data/pages/aboutus.json'

interface Reference {
	photo: string
	reference: Translations | string
	who: Translations | string
}

interface ReferenceCarouselProps {
	references: Reference[]
}

const ReferencesCarousel: FC<ReferenceCarouselProps> = ({ references }) => {
	const t = useTranslations()

	const [ currentItemIndex, setCurrentItemIndex ] = useState(0)

	// The list can change at runtime (hand-written fallback -> live Google reviews),
	// so the rotation has to restart and stay inside the new bounds.
	useEffect(() => {
		setCurrentItemIndex(0)
	}, [ references.length ])

	useEffect(() => {
		if (references.length < 2) return

		const interval = setInterval(() => {
			setCurrentItemIndex((c) => (c + 1) % references.length)
		}, 5000)

		// Clear interval after killing the component
		return () => clearInterval(interval)
	}, [ references.length ])

	// Memoize current reference
	const currReference = useMemo(
		() => references[currentItemIndex] ?? references[0],
		[ currentItemIndex, references ]
	)

	if (!currReference) return null

	return (
		<AnimateSharedLayout>
			<m.div
				layout
				className={c(
					"p-12 w-[612px] h-[612px] text-dark-blue flex flex-col items-center justify-center space-y-16 rounded-full bg-wine-primary bg-opacity-20",
					"md:w-[300px] md:h-[300px]"
				)}
			>
				<m.h1 layout className={c("font-bold text-[40px]", "md:text-2xl")}>
					{t(pageData.referenceTitle)}
				</m.h1>
				<AnimatePresence initial={false} exitBeforeEnter>
					<m.div
						{...opacityAnimation}
						key={`${t(currReference.reference)} ${t(currReference.who)}`}
						layout
						className="flex flex-col items-center justify-center space-y-8 h-2/4 "
					>
						<m.p layout className={c("text-3xl font-bold", "md:text-base md:leading-snug")}>{`“${t(currReference.reference)}”`}</m.p>
						<m.p layout className={c("max-w-sm text-sm")}>
							{' '}
							{t(currReference.who)}{' '}
						</m.p>
					</m.div>
				</AnimatePresence>
			</m.div>
		</AnimateSharedLayout>
	)
}

export default ReferencesCarousel

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

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentItemIndex((c) => {
				if (c < references.length - 1) return c + 1
				else return 0
			})
		}, 5000)

		// Clear interval after killing the component
		return () => clearInterval(interval)
	}, [])

	// Memoize current reference
	const currReference = useMemo(() => references[currentItemIndex], [ currentItemIndex ])

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

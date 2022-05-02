import { FC } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { opacityAnimation } from '../../../animations/navigation'
import { c } from '../../../services/misc'
import Button from '../../Layout/Button'
import { ArrowRight } from '../../Layout/Icons'

interface AnchorButtonProps {
	show: boolean
	href: string
	text: string
}

const AnchorButton: FC<AnchorButtonProps> = ({ show, href, text }) => {
	return (
		<AnimatePresence>
			{show && <motion.a
				href={href}
				target="_blank"
				{ ...opacityAnimation }
				className={c(
					'fixed bottom-8 right-8 flex justify-end leading-normal',
					'md:justify-center'
			)}
			>
				<Button
					type="basic"
					className={c('px-12 py-3.5', 'md:py-3 md:px-10')}
				>
					<div className="flex items-center space-x-8">
						<span>{text}</span>
						<ArrowRight className="w-5 h-5 flex-shrink-0" />
					</div>
				</Button>
			</motion.a>}
		</AnimatePresence>
	)
}

export default AnchorButton

import { FC } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { opacityAnimation } from '../../../animations/navigation'
import { c, doScrolling } from '../../../services/misc'
import Button from '../../Layout/Button'
import { ArrowRight } from '../../Layout/Icons'

interface OrderButtonProps {
	show: boolean
	text: string
	disabled?: boolean
	element?: string
}

const OrderButton: FC<OrderButtonProps> = ({ show, text, disabled, element = '#services-form' }) => {
	return (
		<AnimatePresence>
			{show && <motion.div
				{ ...opacityAnimation }
				className={c(
					'fixed bottom-8 right-8 flex justify-end',
					'md:justify-center'
			)}
			>
				<Button
					type="basic"
					disabled={disabled}
					onClick={() => doScrolling(element, 1000, 100)}
					className={c('px-12 py-3.5', 'md:py-3 md:px-10')}
				>
					<div className="flex items-center space-x-8">
						<span>{text}</span>
						<ArrowRight className="w-5 h-5 flex-shrink-0" />
					</div>
				</Button>
			</motion.div>}
		</AnimatePresence>
	)
}

export default OrderButton

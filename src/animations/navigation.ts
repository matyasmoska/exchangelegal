import { MotionProps } from "framer-motion";

export const opacityAnimation: MotionProps = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	exit: { opacity: 0 }
}

export const heightAnimation: MotionProps = {
	initial: { height: 0 },
	animate: { height: '100%' },
	exit: { height: 0 },
	transition: { type: 'tween', duration: 0.2 }
}
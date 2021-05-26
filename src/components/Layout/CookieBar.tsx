import { motion } from 'framer-motion'
import Link from 'next/link'
import React from 'react'
import { useCookies } from 'react-cookie'
import data from '../../data/pages/cookies.json'
import { c } from '../../services/misc'
import Button from './Button'

const CookieBar = () => {
	const [cookies, setCookie] = useCookies(['cookie-consent'])

	return (
		<motion.div
			className={c(
				'fixed bottom-0 flex items-center justify-between w-full z-50 py-3 text-white bg-dark-blue bg-opacity-95',
				'px-36',
				'2xl:px-24',
				'xl:px-16',
                'md:flex-col md:px-4 md:justify-start md:space-y-4'
			)}
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'tween', duration: 0.5 }}
		>
			<div className="flex flex-col space-y-1">
				<h3 className="font-bold">{data.header}</h3>
				<p>{data.subheader} <Link href="/zasady-zpracovani-osobnich-udaju"><a className={c("underline", 'md:block')}>{data.moreInfoText}</a></Link> </p>
			</div>
			<Button
				type="basic"
				className="px-8 py-2"
				onClick={() => {
					setCookie('cookie-consent', true)
				}}
			>
				{data.confirmButtonText}
			</Button>
		</motion.div>
	)
}

export default CookieBar

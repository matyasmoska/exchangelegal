import Link from 'next/link'
import React from 'react'
import { c } from '../../services/misc'
import { LogoWhite } from '../Layout/Logo'
import { FacebookIcon, LinkedInIcon, TwitterIcon } from './Icons'

const Footer = () => {
	return (
		<div
			className={c(
				'flex items-center justify-between w-full py-20 text-white px-44 bg-dark-blue',
				'3xl:px-24',
				'2xl:px-20',
				'md:py-10 md:px-10 md:block md:space-y-16 md:text-center md:text-lg'
			)}
		>
			<div className="space-y-3">
				<LogoWhite />
				<p>2021 by AML Solutions. Všechna práva vyhrazena.</p>
			</div>
			<div
				className={c(
					'flex space-x-32',
					'2xl:space-x-24',
					'md:flex-col md:space-x-0 md:space-y-16 md:text-center'
				)}
			>
				<div className="space-y-10">
					<h3 className="text-xl font-bold">Menu</h3>
					<div className="flex flex-col space-y-4">
						<Link href="/obligations">
							<a className="hover:underline">AML Povinnosti</a>
						</Link>
						<Link href="/services">
							<a className="hover:underline">Služby</a>
						</Link>
						<Link href="/calculator">
							<a className="hover:underline">Cenový kalkulátor</a>
						</Link>
						<Link href="/about">
							<a className="hover:underline">O nás</a>
						</Link>
					</div>
				</div>
				<div className="space-y-10">
					<h3 className="text-xl font-bold">Kontakty</h3>
					<div className="flex flex-col space-y-3">
						<p className="font-bold">AML Solutions s.r.o</p>
						<p>Vršovická 896/32, Vršovice</p>
						<p>100 01 Praha</p>
					</div>
					<div className="flex flex-col space-y-3">
						<a href="tel:123123123" className="hover:underline">
							+420 123 123 123
						</a>
						<a href="mail:info@amlsolutions.com" className="hover:underline">
							info@amlsolutions.com
						</a>
					</div>
				</div>
				<div className="space-y-10">
					<h3 className="text-xl font-bold">Sledujte nás</h3>
					<div className={c('flex space-x-4 text-white', 'md:text-center md:justify-center')}>
						<a href={'https://facebook.com'}>
							<FacebookIcon className="fill-current w-7 h-7" />
						</a>
						<a href={'https://facebook.com'}>
							<TwitterIcon className="fill-current w-7 h-7" />
						</a>
						<a href={'https://facebook.com'}>
							<LinkedInIcon className="fill-current w-7 h-7" />
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Footer

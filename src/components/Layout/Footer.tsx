import Link from 'next/link'
import React from 'react'
import { c } from '../../services/misc'
import { LogoWhite } from '../Layout/Logo'
import { FacebookIcon, LinkedInIcon, TwitterIcon } from './Icons'
import pageData from '../../data/navigation.json'
import contactPageData from '../../data/contact.json'

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
			<div className="self-start space-y-3">
				<LogoWhite />
				<p>{contactPageData.allRightsReserved}</p>
				<img src="/images/crypto_white.svg" className={c("w-4/5 pt-2", 'md:mx-auto')} />
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
							<a className="hover:underline">{pageData.obligations}</a>
						</Link>
						<Link href="/whatisaml">
							<a className="hover:underline">{pageData.whatisaml}</a>
						</Link>
						<Link href="/services">
							<a className="hover:underline">{pageData.services}</a>
						</Link>
						<Link href="/about">
							<a className="hover:underline">{pageData.about}</a>
						</Link>
						<Link href="/faq">
							<a className="hover:underline">{pageData.faq}</a>
						</Link>
					</div>
				</div>
				<div className="space-y-10">
					<h3 className="text-xl font-bold">Kontakty</h3>
					<div className="flex flex-col space-y-3">
						<p className="font-bold">{contactPageData.address.firstLine}</p>
						<p>{contactPageData.address.secondLine}</p>
						<p>{contactPageData.address.thirdLine}</p>
					</div>
					<div className="flex flex-col space-y-3">
						<a href={"tel:" + contactPageData.phoneNumber} className="hover:underline">
							{contactPageData.phoneNumber}
						</a>
						<a href={`mail:${contactPageData.email}`} className="hover:underline">
							{contactPageData.email}
						</a>
					</div>
				</div>
				<div className="space-y-10">
					<h3 className="text-xl font-bold">Sledujte nás</h3>
					<div className={c('flex space-x-4 text-white', 'md:text-center md:justify-center')}>
						<a href={contactPageData.links.facebook} aria-label="Facebook Link">
							<FacebookIcon className="fill-current w-7 h-7" />
						</a>
						<a href={contactPageData.links.twitter} aria-label="Twitter Link">
							<TwitterIcon className="fill-current w-7 h-7" />
						</a>
						<a href={contactPageData.links.linkedIn} aria-label="Linked In Link">
							<LinkedInIcon className="fill-current w-7 h-7" />
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Footer

import Link from 'next/link'
import React from 'react'
import { useTranslations } from '../../hooks/useTranslations'
import { c } from '../../services/misc'
import { LogoWhite } from '../Layout/Logo'
import { FacebookIcon, LinkedInIcon, TwitterIcon } from './Icons'
import pageData from '../../data/navigation.json'
import contactPageData from '../../data/contact.json'

const Footer = () => {
	const t = useTranslations<string>()

	return (
		<div
			className={c(
				'flex items-center justify-between w-full py-20 text-white px-32 bg-dark-blue',
				'font-header gap-x-20',
				'3xl:px-24',
				'2xl:px-20',
				'xl:px-16 xl:gap-x-12',
				'xl:px-12 lg:gap-x-8',
				'md:py-10 md:px-10 md:block md:space-y-16 md:text-center md:text-lg'
			)}
		>
			<div className="self-start space-y-4">
				<LogoWhite />			
				<Link href="/prijimame-kryptomeny">
				<a target="_blank">
				<img src={t(contactPageData.cryptoImage)} alt="Přijímáme kryptoměny!" className={c('w-4/5 rounded-lg flex', 'md:mx-auto')} />
				</a>
				</Link>
				<p className="pt-2">{t(contactPageData.allRightsReserved)}</p>
			</div>
			<div
				className={c(
					'flex space-x-32',
					'2xl:space-x-16',
					'xl:space-x-12',
					'lg:space-x-8',
					'md:flex-col md:space-x-0 md:space-y-16 md:text-center'
				)}
			>
				<div className="space-y-10">
					<h3 className="text-xl font-bold">{t(pageData.services)}</h3>
					<div className="flex flex-col space-y-4">
						<Link href="/zalozeni-alternativniho-fondu-na-klic">
							<a className="hover:underline">{t(pageData.zalozeni)}</a>
						</Link>
						<Link href="/reporting-cnb">
							<a className="hover:underline">{t(pageData.reportingcnb)}</a>
						</Link>
						<Link href="/priprava-kid-dle-narizeni-priips">
							<a className="hover:underline">{t(pageData.pripravakiddlenarizenipriips)}</a>
						</Link>

						<Link href="/aml-povinnosti">
							<a className="hover:underline">{t(pageData.amlpovinnosti)}</a>
						</Link>
						<Link href="/investicni-strategie">
							<a className="hover:underline">{t(pageData.investicnistrategie)}</a>
						</Link>
						<Link href="/investicni-smlouva">
							<a className="hover:underline">{t(pageData.investicnismlouva)}</a>
						</Link>
					</div>
				</div>
				
				<div className="space-y-10">
					<h3 className="text-xl font-bold">{t(pageData.menu)}</h3>
					<div className="flex flex-col space-y-4">
						<Link href="/alternativni-investicni-fond">
							<a className="hover:underline">{t(pageData.cojeto)}</a>
						</Link>
						<Link href="/povinnosti-spravce-fondu">
							<a className="hover:underline">{t(pageData.povinnostispravcefondu)}</a>
						</Link>
						<Link href="/aktuality">
							<a className="hover:underline">{t(pageData.news)}</a>
						</Link>
						<Link href="/nase-sluzby">
							<a className="hover:underline">{t(pageData.services)}</a>
						</Link>
						<Link href="/o-nas">
							<a className="hover:underline">{t(pageData.about)}</a>
						</Link>
						<Link href="/casto-kladene-dotazy">
							<a className="hover:underline">{t(pageData.castokladenedotazy)}</a>
						</Link>
					</div>
				</div>
				<div className="space-y-10">
					<h3 className="text-xl font-bold">{t(pageData.contact)}</h3>
					<div className="flex flex-col space-y-8">
						<div className="flex flex-col space-y-4">
							<p className="font-bold">{contactPageData.contact.url}</p>
							<a href={`tel:${contactPageData.contact.phoneNumberLink}`} className="hover:underline">
								{contactPageData.contact.phoneNumber}
							</a>
							<a href={`mailto:${contactPageData.contact.emailLink}`} className="hover:underline">
								{contactPageData.contact.email}
							</a>
							<Link href="/pravni-informace-a-podminky-uziti">
								<a className="hover:underline" target="_blank">{t(pageData.tos)}</a>
							</Link>
							<Link href="/zasady-zpracovani-osobnich-udaju">
								<a className="hover:underline">{t(pageData.privacypolicy)}</a>
							</Link>
							<Link href="/pravidla-pouzivani-cookies">
								<a className="hover:underline">{t(pageData.cookierules)}</a>
							</Link>
						</div>
						
					</div>
				</div>
				<div className="space-y-10">
					<h3 className="text-xl font-bold">{t(pageData.sledujtenas)}</h3>
					<div className={c('flex space-x-4 text-white', 'md:text-center md:justify-center md:pb-52')}>
						<a href={contactPageData.contact.links.linkedIn} target="_blank" rel="noopener" aria-label="Linked In Link">
							<LinkedInIcon className="fill-current w-7 h-7" />
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Footer

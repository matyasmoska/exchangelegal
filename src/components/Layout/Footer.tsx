import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { c } from '../../services/misc'
import { LogoWhite } from '../Layout/Logo'
import { FacebookIcon, LinkedInIcon, TwitterIcon } from './Icons'
import pageData from '../../data/navigation.json'
import contactPageData from '../../data/footer.json'

const Footer = () => {
	const router = useRouter()

	return (
		<div
			className={c(
				'flex items-center justify-between w-full py-20 text-white px-32 bg-dark-blue',
				'3xl:px-24',
				'2xl:px-20',
				'md:py-10 md:px-10 md:block md:space-y-16 md:text-center md:text-lg'
			)}
		>
			<div className="self-start space-y-4">
				<LogoWhite />			
				<a href="/prijimame-kryptomeny" target="_blank">
				<img src="/images/crypto_white.svg" alt="Přijímáme kryptoměny!" className={c('w-4/5 rounded-lg flex', 'md:mx-auto')} />
				</a>		
				<p className="pt-2">{contactPageData.allRightsReserved}</p>
			</div>
			<div
				className={c(
					'flex space-x-32',
					'2xl:space-x-24',
					'md:flex-col md:space-x-0 md:space-y-16 md:text-center'
				)}
			>
				<div className="space-y-10">
					<h3 className="text-xl font-bold">Naše služby</h3>
					<div className="flex flex-col space-y-4">
						<Link href="/zalozeni-fondu-na-klic">
							<a className="hover:underline">{pageData.zalozeni}</a>
						</Link>
						<Link href="/reporting-cnb">
							<a className="hover:underline">{pageData.reportingcnb}</a>
						</Link>
						<Link href="/priprava-kid-dle-narizeni-priips">
							<a className="hover:underline">{pageData.pripravakiddlenarizenipriips}</a>
						</Link>
						<Link href="/povinnosti-dle-sfdr">
							<a className="hover:underline">{pageData.povinnostidlesfdr}</a>
						</Link>
						<Link href="/aml-povinnosti">
							<a className="hover:underline">{pageData.amlpovinnosti}</a>
						</Link>
						<Link href="/investicni-strategie">
							<a className="hover:underline">{pageData.investicnistrategie}</a>
						</Link>
						<Link href="/investicni-smlouva">
							<a className="hover:underline">{pageData.investicnismlouva}</a>
						</Link>
					</div>
				</div>
				
				<div className="space-y-10">
					<h3 className="text-xl font-bold">Menu</h3>
					<div className="flex flex-col space-y-4">
						<Link href="/povinnosti-spravce-fondu">
							<a className="hover:underline">{pageData.povinnostispravcefondu}</a>
						</Link>

						<Link href="/aktuality">
							<a className="hover:underline">{pageData.news}</a>
						</Link>
						
						<Link href="/nase-sluzby">
							<a className="hover:underline">{pageData.services}</a>
						</Link>
						<Link href="/o-nas">
							<a className="hover:underline">{pageData.about}</a>
						</Link>
						<Link href="/casto-kladene-dotazy">
							<a className="hover:underline">{pageData.castokladenedotazy}</a>
						</Link>
					</div>
				</div>
				<div className="space-y-10">
					<h3 className="text-xl font-bold">Kontakty</h3>
					<div className="flex flex-col space-y-8">
						<div className="flex flex-col space-y-4">
							<p className="font-bold">{contactPageData.contact.address.firstLine}</p>
							{contactPageData.contact.address.secondLine.length > 0 && (
								<p className="italic">{contactPageData.contact.address.secondLine}</p>
							)}
							{contactPageData.contact.address.thirdLine.trim().length > 0 && (
								<p>{contactPageData.contact.address.thirdLine}</p>
							)}
							<a href={`tel:${contactPageData.contact.phoneNumber}`} className="hover:underline">
								{contactPageData.contact.phoneNumber}
							</a>
							<a href={`mailto:${contactPageData.contact.email}`} className="hover:underline">
								{contactPageData.contact.email}
							</a>
							<a className="hover:underline" href="/pravni-informace-a-podminky-uziti" target="_blank">{pageData.tos}</a>
							<Link href="/zasady-zpracovani-osobnich-udaju">
								<a className="hover:underline">{pageData.privacypolicy}</a>
							</Link>
							<Link href="/pravidla-pouzivani-cookies">
								<a className="hover:underline">{pageData.cookierules}</a>
							</Link>
							<Link href={{ pathname: router.pathname, query: { ...router.query, consent: 'setup' } }} scroll={false}>
								<a className="hover:underline">{pageData.cookiesettings}</a>
							</Link>
						</div>
						
					</div>
				</div>
				<div className="space-y-10">
					<h3 className="text-xl font-bold">Sledujte nás</h3>
					<div className={c('flex space-x-4 text-white', 'md:text-center md:justify-center md:pb-52')}>
						
						
						<a href={contactPageData.contact.links.twitter} target="_blank" rel="noopener" aria-label="Twitter Link">
							<TwitterIcon className="fill-current w-7 h-7" />
						</a>
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

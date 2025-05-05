import DefaultLayout from '../layouts/DefaultLayout'
import SEO from '../components/Layout/SEO'
import React from 'react'
import { PhoneIcon, MessageIcon, FacebookIcon, TwitterIcon, LinkedInIcon } from '../components/Layout/Icons'
import { WrappedIconRow, IconRow } from '../components/Layout/Icon'
import ContactForm from '../components/Pages/contact/ContactForm'
import { c } from '../services/misc'
import { useTranslations } from '../hooks/useTranslations'
import contactPageData from '../data/contact.json'

export default function Contact () {
	const t = useTranslations()

	return (
		<DefaultLayout>
			<SEO
				title="15 ZISIF – kontakty – 15zisif.cz"
description="✅ Jsme odborníky v oblasti zakládání fondů ⭐ Máme unikátní zkušenosti a know-how v oblasti alternativních fondů dle § 15 ZISIF"
keywords="alternativní investiční fond, minifond, alternativní fond, § 15 ZISIF, 15zisif, osoba rizikového kapitálu"
			/>
			<div
				className={c(
					'flex space-x-4 px-36 py-8 pb-52',
					'2xl:px-24',
					'xl:px-24',
					'md:block md:space-x-0 md:px-0 md:pb-32'
				)}
			>
				<div className="flex flex-col w-full">
				  <div className="mb-6 h-4/5 max-h-[31.5rem] bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url("/images/moskamurad1.jpg")` }} />
				  <div className={c('w-full relative shadow-inner flex-grow', 'md:h-72')}>
					<iframe
						width="100%"
						height="100%"
						className="relative z-20"
						style={{ border: 0 }}
						src="https://maps.google.com/maps?width=533&amp;height=400&amp;hl=en&amp;q=Na Dolinách 153/22, Podolí, 147 00 Praha 4&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
					/>
					<div className="absolute top-0 left-0 z-0 w-full h-full transition transform bg-gray-300 animate-pulse" />
				  </div>
				</div>
				<div className={c('w-5/6 px-4 py-0 space-y-8', 'md:p-8 md:w-full')}>
					<div className="space-y-8">
						<div className={c('space-y-2.5')}>
							<h1 className="text-3xl font-bold">{t(contactPageData.contact.header)}</h1>
							<p className="text-justify">{t(contactPageData.contact.description)}</p>
						</div>
						<div className={c('space-y-2.5')}>
							<p className="font-bold">{contactPageData.contact.address.firstLine1}</p>
							<p className="font-bold">{contactPageData.contact.address.firstLine2}</p>
							<p>{contactPageData.contact.address.secondLine}</p>
							<p>{t(contactPageData.contact.secondDescription)}</p>
							<p>{t(contactPageData.contact.thirdDescription)}</p>
						</div>
						<div className={c('space-y-2.5')}>
							<WrappedIconRow Icon={PhoneIcon} href={`tel:${contactPageData.contact.phoneNumberLink}`}>
								{contactPageData.contact.phoneNumber}
							</WrappedIconRow>
							<WrappedIconRow Icon={MessageIcon} href={`mailto:${contactPageData.contact.emailLink}`}>
								{contactPageData.contact.email}
							</WrappedIconRow>
						</div>
						<div className="flex flex-col space-y-2.5 text-dark-blue">





							
							<a
								href={contactPageData.contact.links.linkedIn}
								className="flex items-center space-x-3"
								aria-label="Linked In Link"
								target="_blank"
							>
								<LinkedInIcon className="fill-current w-7 h-7" />
								<span>Linked In</span>
							</a>
						</div>
					</div>
					<ContactForm />
				</div>
			</div>
		</DefaultLayout>
	)
}

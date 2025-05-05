import React from 'react'
import { c } from '../../../services/misc'
import { WrappedIconRow, IconRow } from '../../Layout/Icon'
import { PhoneIcon, MessageIcon, FacebookIcon, TwitterIcon, LinkedInIcon } from '../../Layout/Icons'
import { useTranslations } from '../../../hooks/useTranslations'
import contactPageData from '../../../data/contact.json'

const ContactSection = () => {
	const t = useTranslations()

	return (
		<div
			className={c(
				'flex justify-between w-full mt-32 space-x-12',
				'3xl:space-x-8',
				'md:flex-col md:space-x-0 md:space-y-12 md:my-16'
			)}
		>
			<div className={c('pl-36 min-w-max space-y-8', '3xl:pl-28', '2xl:pl-20', 'xl:min-w-[48%]', 'md:px-8')}>
				<div className={c('space-y-2.5 w-4/6', '2xl:w-5/6', 'md:w-full')}>
					<h2 className="text-3xl font-bold">{t(contactPageData.contact.header)}</h2>
					<p className="text-justify">
						{t(contactPageData.contact.descriptionForHomePage)}
					</p>
				</div>
				<div className={c('space-y-2.5 w-5/6', 'md:w-full')}>
					<p className="font-bold">{contactPageData.contact.address.firstLine1}</p>
					<p className="font-bold">{contactPageData.contact.address.firstLine2}</p>
					<p>{contactPageData.contact.address.secondLine}</p>
					<p>{t(contactPageData.contact.secondDescriptionForHomePage)}</p>
				</div>
				<div className={c('space-y-2.5 w-4/6', 'md:w-full')}>
					<WrappedIconRow Icon={PhoneIcon} href={`tel:${contactPageData.contact.phoneNumberLink}`}>
						{contactPageData.contact.phoneNumber}
					</WrappedIconRow>
					<WrappedIconRow Icon={MessageIcon} href={`mailto:${contactPageData.contact.emailLink}`}>
						{contactPageData.contact.email}
					</WrappedIconRow>
				</div>
				<div className={c('space-y-2.5 w-4/6 flex flex-col', 'md:w-full')}>

					<IconRow href={contactPageData.contact.links.linkedIn} Icon={LinkedInIcon}>
						Linked In
					</IconRow>
				</div>
			</div>
			<div className={c('w-full pr-36', '3xl:pr-28', '2xl:pr-20', 'md:h-56 md:pr-0')}>
				<iframe
					width="100%"
					height="100%"
					title="Na Dolinách 153/22, Podolí, 147 00 Praha 4"
					style={{ border: 0 }}
					loading="lazy"
					src="https://maps.google.com/maps?width=533&amp;height=400&amp;hl=en&amp;q=Na Dolinách 153/22, Podolí, 147 00 Praha 4&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
				/>
			</div>
		</div>
	)
}

export default ContactSection

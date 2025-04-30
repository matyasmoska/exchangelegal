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
					title="City Empiria, Na Strži 1702/65, 140 00 Praha 4"
					style={{ border: 0 }}
					loading="lazy"
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2561.9223858112055!2d14.437017615885283!3d50.05028522399825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470b94759b1f6d5b%3A0x588df01abda2d398!2sNa%20Str%C5%BEi%201702%2F65%2C%20140%2000%20Praha%204-Nusle!5e0!3m2!1scs!2scz!4v1646906243995!5m2!1scs!2scz"
				/>
			</div>
		</div>
	)
}

export default ContactSection

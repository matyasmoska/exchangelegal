import React from 'react'
import { c } from '../../../services/misc'
import { WrappedIconRow, IconRow } from '../../Layout/Icon'
import { PhoneIcon, MessageIcon, FacebookIcon, TwitterIcon, LinkedInIcon } from '../../Layout/Icons'
import contactPageData from '../../../data/pages/index.json'

const ContactSection = () => {
	return (
		<div
			className={c(
				'flex justify-between w-full mt-32 space-x-12',
				'3xl:space-x-8',
				'md:flex-col md:space-x-0 md:space-y-12 md:my-16'
			)}
		>
			<div className={c('pl-36 flex-shrink-0 space-y-8', '3xl:pl-28', '2xl:pl-20', 'md:px-8')}>
				<div className={c('space-y-2.5 w-4/6', '2xl:w-5/6', 'md:w-full')}>
					<h2 className="text-3xl font-bold">{ contactPageData.contact.header }</h2>
					<p className="text-justify">
						{ contactPageData.contact.description }
					</p>
				</div>
				<div className={c('space-y-2.5 w-4/6', 'md:w-full')}>
					<p className="font-bold">{contactPageData.contact.address.firstLine}</p>
					<p>{contactPageData.contact.address.secondLine}</p>
					<p>{contactPageData.contact.address.thirdLine}</p>
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
					<IconRow href={contactPageData.contact.links.facebook} Icon={FacebookIcon}>
						Facebook
					</IconRow>
					<IconRow href={contactPageData.contact.links.twitter} Icon={TwitterIcon}>
						Twitter
					</IconRow>
					<IconRow href={contactPageData.contact.links.linkedIn} Icon={LinkedInIcon}>
						Linked In
					</IconRow>
				</div>
			</div>
			<div className={c('w-full pr-32', 'md:h-56 md:pr-0')}>
				<iframe
					width="100%"
					height="100%"
					title="City Empiria, Na Strži 1702/65, 140 00 Praha 4"
					style={{ border: 0 }}
					loading="lazy"
					src="https://www.google.com/maps/place/Na+Str%C5%BEi+1702%2F65,+140+00+Praha+4-Nusle/@50.0502852,14.4370176,17z/data=!3m1!4b1!4m5!3m4!1s0x470b94759b1f6d5b:0x588df01abda2d398!8m2!3d50.0502818!4d14.4392063"
				/>
			</div>
		</div>
	)
}

export default ContactSection

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
			<div className={c('pl-36 flex-shrink-0 space-y-8', '3xl:pl-28', '2xl:pl-20', 'md:pl-8')}>
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
					title="Vršovická 896/32, Vršovice"
					style={{ border: 0 }}
					loading="lazy"
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1441.0098446456882!2d14.451591770865328!3d50.06577504900528!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470b9381d219b23d%3A0x2b02a8cd3cb67f85!2sVr%C5%A1ovick%C3%A1%20896%2F32%2C%20101%2000%20Praha%2010-Vr%C5%A1ovice%2C%20Czechia!5e0!3m2!1sen!2sde!4v1618596586436!5m2!1sen!2sde"
				/>
			</div>
		</div>
	)
}

export default ContactSection

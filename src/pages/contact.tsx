import DefaultLayout from '../layouts/DefaultLayout'
import React from 'react'
import { PhoneIcon, MessageIcon, FacebookIcon, TwitterIcon, LinkedInIcon } from '../components/Layout/Icons'
import { WrappedIconRow, IconRow } from '../components/Layout/Icon'
import ContactForm from '../components/Pages/contact/ContactForm'
import { c } from '../services/misc'
import contactPageData from '../data/contact.json'
import pageData from '../data/pages/contact.json'

export default function Contact () {
	return (
		<DefaultLayout>
			<div className={c('flex space-x-8', 'md:block md:space-x-0')}>
				<div className={c('w-full relative shadow-inner', 'md:h-72')}>
					<iframe
						width="100%"
						height="100%"
						className="relative z-20"
						style={{ border: 0 }}
						loading="lazy"
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1441.0098446456882!2d14.451591770865328!3d50.06577504900528!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470b9381d219b23d%3A0x2b02a8cd3cb67f85!2sVr%C5%A1ovick%C3%A1%20896%2F32%2C%20101%2000%20Praha%2010-Vr%C5%A1ovice%2C%20Czechia!5e0!3m2!1sen!2sde!4v1618596586436!5m2!1sen!2sde"
					/>
					<div className="absolute top-0 left-0 z-0 w-full h-full transition transform bg-gray-300 animate-pulse" />
				</div>
				<div className={c('w-5/6 p-16 space-y-8', '2xl:p-10 2xl:px-8', 'md:p-8 md:w-full')}>
					<div className="space-y-8">
						<div className={c('space-y-2.5 w-4/6', 'md:w-full')}>
							<h2 className="text-3xl font-bold">{pageData.header}</h2>
							<p className="text-justify">
								{pageData.description}
							</p>
						</div>
						<div className={c('space-y-2.5 w-4/6', 'md:w-full')}>
							<p className="font-bold">{contactPageData.address.firstLine}</p>
							<p>{contactPageData.address.secondLine}</p>
							<p>{contactPageData.address.thirdLine}</p>
						</div>
						<div className={c('space-y-2.5 w-4/6', 'md:w-full')}>
							<WrappedIconRow Icon={PhoneIcon} href={`tel:${contactPageData.phoneNumber}`}>
								{contactPageData.phoneNumber}
							</WrappedIconRow>
							<WrappedIconRow Icon={MessageIcon} href={`mail:${contactPageData.email}`}>
								{contactPageData.email}
							</WrappedIconRow>
						</div>
						<div className="flex flex-col space-y-2.5 w-4/6 text-dark-blue">
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
					<ContactForm />
				</div>
			</div>
		</DefaultLayout>
	)
}

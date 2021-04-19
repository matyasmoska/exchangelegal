import React from 'react'
import { c } from '../../../services/misc'
import { WrappedIconRow, IconRow } from '../../Layout/Icon'
import { PhoneIcon, MessageIcon, FacebookIcon, TwitterIcon, LinkedInIcon } from '../../Layout/Icons'

const ContactSection = () => {
	return (
		<div className={c('flex justify-between w-full my-64 space-x-12', 'md:flex-col md:space-x-0 md:space-y-12')}>
			<div className={c('pl-32 space-y-8', 'md:pl-8')}>
				<div className={c('space-y-2.5 w-4/6', 'md:w-full')}>
					<h2 className="text-3xl font-bold">Kontakty</h2>
					<p>
						Je součástí systému vnitřních zásad. Správné nastavení hodnocení rizik “na míru” je nezbytným
						předpokladem k tomu, aby AML povinnosti byly řádně plněna a případná kontrola skončila bez
						nálezu.
					</p>
				</div>
				<div className={c('space-y-2.5 w-4/6', 'md:w-full')}>
					<p className="font-bold">AML Solutions s.r.o</p>
					<p>Vršovická 896/32, Vršovice</p>
					<p>100 01 Praha</p>
				</div>
				<div className={c('space-y-2.5 w-4/6', 'md:w-full')}>
					<WrappedIconRow Icon={PhoneIcon} href="tel:607172067">
						123 123 123
					</WrappedIconRow>
					<WrappedIconRow Icon={MessageIcon} href="mail:info@amlsolutions.cz">
						info@amlsolutions.cz
					</WrappedIconRow>
				</div>
				<div className={c('space-y-2.5 w-4/6 flex flex-col', 'md:w-full')}>
					<IconRow href="https://facebook.com" Icon={FacebookIcon}>
						Facebook
					</IconRow>
					<IconRow href="https://facebook.com" Icon={TwitterIcon}>
						Twitter
					</IconRow>
					<IconRow href="https://facebook.com" Icon={LinkedInIcon}>
						Linked In
					</IconRow>
				</div>
			</div>
			<div className={c("w-full shadow-inner", 'md:h-56')}>
				<iframe
					width="100%"
					height="100%"
					style={{ border: 0 }}
					loading="lazy"
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1441.0098446456882!2d14.451591770865328!3d50.06577504900528!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470b9381d219b23d%3A0x2b02a8cd3cb67f85!2sVr%C5%A1ovick%C3%A1%20896%2F32%2C%20101%2000%20Praha%2010-Vr%C5%A1ovice%2C%20Czechia!5e0!3m2!1sen!2sde!4v1618596586436!5m2!1sen!2sde"
				/>
			</div>
		</div>
	)
}

export default ContactSection

import { AnimateSharedLayout, motion as m } from 'framer-motion'
import React, { FC } from 'react'
import contactPageData from '../../../data/pages/index.json'

/*
    Top contact bar on all pages.
    Config can be found on pages/index.json
*/

const TopBar: FC = () => {
	return (
		<AnimateSharedLayout>
		    <m.div layout className="bg-dark-blue font-header font-semibold">
                <div className="flex flex-wrap gap-x-4 gap-y-2 py-3 px-36 2xl:px-24 xl:px-16 md:px-8 xs:px-4 bg-white text-dark-blue bg-opacity-70">
                    <div className="flex gap-2">
                        <img src="/images/mail-icon.svg" className="w-6 h-6" />
                        <a href={`mailto:${contactPageData.contact.email}`} className="hover:underline">
                            {contactPageData.contact.email}
                        </a>
                    </div>
                    <div className="flex gap-2">
                        <img src="/images/phone-icon.svg" className="w-6 h-6" />
                        <a href={`tel:${contactPageData.contact.phoneNumber}`} className="hover:underline">
                            {contactPageData.contact.phoneNumber}
                        </a>
                    </div>
                    <div className="flex gap-4">
                        <a href={contactPageData.contact.links.twitter} target="_blank" rel="noopener" aria-label="Twitter Link">
                            <img src="/images/twitter-icon.svg" className="w-6 h-6" />
                        </a>
                        <a href={contactPageData.contact.links.linkedIn} target="_blank" rel="noopener" aria-label="Linked In Link">
                            <img src="/images/linkedin-icon.svg" className="w-6 h-6" />
                        </a>
                    </div>
    			</div>
    		</m.div>
		</AnimateSharedLayout>
	)
}

export default TopBar

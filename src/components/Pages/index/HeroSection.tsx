import Link from 'next/link'
import React from 'react'
import { c } from '../../../services/misc'
import Button from '../../Layout/Button'

const HeroSection = () => {
	return (
		<div className={c('relative z-10 max-w-2xl space-y-12 text-white', 'md:max-w-none md:text-center')}>
			<h1 className={c('text-6xl font-bold leading-snug', 'md:text-4xl')}>
				Praktické řešení na míru vaší AML povinnosti
			</h1>
			<p className="text-lg text-justify">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam adipisci natus amet magni dolorum
				possimus provident autem illo, eum tempore nisi magnam quibusdam ducimus expedita suscipit aut modi
				aspernatur? Impedit?
			</p>
			<div className={c('flex items-center w-9/12 space-x-6', 'md:block md:space-y-6 md:w-full md:space-x-0')}>
				<Link href="/obligations">
					<Button type="basic" className="px-12 py-2.5">
						Ověřit vaší činnost
					</Button>
				</Link>
				<Link href="/whatisaml">
					<Button type="light" className="px-10 py-2.5">
						Co je to AML?
					</Button>
				</Link>
			</div>
		</div>
	)
}

export default HeroSection

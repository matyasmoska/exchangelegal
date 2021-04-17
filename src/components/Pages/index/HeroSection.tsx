import React from 'react'
import Button from '../../Layout/Button'

const HeroSection = () => {
	return (
		<div className="relative z-10 max-w-2xl space-y-12 text-white">
			<h1 className="text-6xl font-bold leading-snug">
				Praktické řešení na míru vaší AML povinnosti
			</h1>
			<p className="text-lg">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam adipisci natus amet
				magni dolorum possimus provident autem illo, eum tempore nisi magnam quibusdam
				ducimus expedita suscipit aut modi aspernatur? Impedit?
			</p>
			<div className="flex items-center w-9/12 space-x-6">
				<Button type="basic" className="px-12 py-2.5">
					Ověřit vaší činnost
				</Button>
				<Button type="light" className="px-10 py-2.5">
					Co je to AML?
				</Button>
			</div>
		</div>
	)
}

export default HeroSection

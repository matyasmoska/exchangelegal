import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import React, { useEffect, useMemo, useState } from 'react'
import Button from '../../components/Layout/Button'
import DefaultLayout from '../../layouts/DefaultLayout'
import SEO from '../../components/Layout/SEO'
import { c } from '../../services/misc'

const ObligationsSuccessPage = () => {
	const router = useRouter()

	// Seconds before redirect
	const [count, setCount] = useState(5)
	
	useEffect(() => {
        const interval = setInterval(() => {
            setCount(( c ) => {
				if ( c > 0 ) return c - 1
				else return c
			})
        }, 1000)

        // Clear interval after killing the component
        return () => clearInterval(interval)
    }, []);

	// Send user off to servies at the end
	useEffect(() => {
		if ( count === 0 ) {
			router.push('/nase-sluzby')
		}
	}, [count])

	const secondsString = useMemo(() => {
		if ( count === 1 ) return 'vteřinu'
		else if ( count <= 4 && count > 0 ) return 'vteřiny'
		else return 'vteřin'
	}, [count]);

	return (
		<DefaultLayout>
			<SEO
				title="AML solutions | Systémová řešení pro Vaše AML povinnosti na míru"
				description="Jsme předními odborníky v oblasti AML compliance"
				keywords="AML, AML solutions, AML compliance"
			/>
			<main className={c("flex items-center justify-center w-full", "md:py-16")}>
				<div
					className={c('flex flex-col items-center justify-center max-w-lg space-y-10', 'md:space-y-10 md:text-center md:px-4')}
					style={{ height: 'calc(100vh - 200px)' }}
				>
					<div className="flex flex-col items-center space-y-6 text-center">
						<div>
							<img src="/images/warning.svg" className={c('w-16 h-16', 'md:w-20 md:h-20')} />
						</div>
						<h1 className="text-3xl font-bold">Vztahují se na Vás AML povinnosti!</h1>
						<p className="px-6 mx-auto text-center">
							Vaše podnikatelská činnost <strong>spadá</strong> pod věcnou působnost AML zákona. Kliknutím na tlačítko
							zobrazíte naše služby spojené s plněním AML povinností.
						</p>
					</div>
					<p className="font-bold">Budete přesměrováni na nabídku našich služeb za { count } { secondsString }...</p>
					<Link href="/nase-sluzby">
						<Button type="basic" className="px-12 py-3">
							Přesměrovat ihned
						</Button>
					</Link>
				</div>
			</main>
		</DefaultLayout>
	)
}

export default ObligationsSuccessPage

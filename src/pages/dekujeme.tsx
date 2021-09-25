import Link from 'next/link'
import Button from '../components/Layout/Button'
import DefaultLayout from '../layouts/DefaultLayout'
import SEO from '../components/Layout/SEO'
import { c } from '../services/misc'

const ServiceFormSuccessPage = () => {
	return (
		<DefaultLayout>
			<SEO
				title="Děkujeme za Vaši objednávku! – AML solutions"
				description="Jsme předními odborníky v oblasti AML compliance"
				keywords="AML, AML solutions, AML compliance"
			/>
			<main className="flex items-center justify-center w-full">
				<div
					className={c("flex flex-col items-center justify-center max-w-lg space-y-20", 'md:space-y-10')}
					style={{ height: 'calc(100vh - 200px)' }}
				>
					<div className="flex flex-col items-center space-y-6 text-center">
						<div>
							<img src="/images/thumb-up.png" className={c("w-16 h-16", 'md:w-20 md:h-20')} />
						</div>
						<h1 className="text-3xl font-bold">Děkujeme!</h1>
						<p className="px-6 mx-auto text-center">
							Odeslání poptávky proběhlo úspěšně. Brzy Vás budeme kontaktovat.
						</p>
					</div>
					<Link href="/">
						<Button type="basic" className="px-12 py-3">
							Zpět na úvodní stránku
						</Button>
					</Link>
				</div>
			</main>
		</DefaultLayout>
	)
}

export default ServiceFormSuccessPage

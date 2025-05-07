import Link from 'next/link'
import Button from '../components/Layout/Button'
import DefaultLayout from '../layouts/DefaultLayout'
import SEO from '../components/Layout/SEO'
import { c } from '../services/misc'
import { useTranslations } from '../hooks/useTranslations'
import pageData from '../data/forms.json'

const ServiceFormSuccessPage = () => {
	const t = useTranslations()

	return (
		<DefaultLayout>
			<SEO
				title="Děkujeme za Vaši objednávku! 15zisif.cz"
				description="✅ Jsme odborníky v oblasti zakládání fondů ⭐ Máme unikátní zkušenosti a know-how v oblasti alternativních fondů dle § 15 ZISIF"
				keywords="alternativní investiční fond, minifond, alternativní fond, § 15 ZISIF, 15zisif, osoba rizikového kapitálu"
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
						<h1 className="text-3xl font-bold">{t(pageData.thanks)}</h1>
						<p className="px-6 mx-auto text-center">
							{t(pageData.thanksSuccess)}
						</p>
					</div>
					<Link href="/">
						<Button type="basic" className="px-12 py-3">
							{t(pageData.backToHomePage)}
						</Button>
					</Link>
				</div>
			</main>
		</DefaultLayout>
	)
}

export default ServiceFormSuccessPage

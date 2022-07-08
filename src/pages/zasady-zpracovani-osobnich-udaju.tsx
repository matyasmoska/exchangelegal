import ParagraphOrMultiple from '../components/Layout/ParagraphOrMultiple'
import DefaultLayout from '../layouts/DefaultLayout'
import SEO from '../components/Layout/SEO'
import { c } from '../services/misc'
import data from '../data/pages/privacypolicy.json'

export default function PrivacyPolicyPage () {
	return (
		<DefaultLayout>
			<SEO
				title="Zásady zpracování osobních údajů – 15zisif.cz"
				description="Systémová řešení pro Vaše AML povinnosti na míru. Jsme předními odborníky v oblasti AML compliance"
				keywords="AML, AML solutions, AML compliance, AML povinnosti, AML systém vnitřních zásad, AML školení, AML hodnocení rizik, AML dotazník, AML zákon, AML směrnice"
			/>
			<div className="flex justify-center w-full">
				<div
					className={c(
						'py-16 flex flex-col items-center text-center max-w-[803px] mb-52 space-y-14',
						'md:px-4 md:py-8'
					)}
				>
					<h1 className={c('text-5xl font-bold leading-snug', 'md:text-2xl')}>
						Zásady zpracování osobních údajů
					</h1>
					<div className="flex flex-col space-y-6">
						<ParagraphOrMultiple text={data.text} className="text-justify" />
					</div>
				</div>
			</div>
		</DefaultLayout>
	)
}

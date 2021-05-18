import DefaultLayout from '../layouts/DefaultLayout'
import { c } from '../services/misc'

export default function PrivacyPolicyPage () {
	return (
		<DefaultLayout>
			<div className={c("py-24 text-center px-36 mb-52 space-y-14", 'md:px-4 md:py-8')}>
				<h1 className={c("text-5xl font-bold leading-snug", "md:text-2xl")}>Zásady zpracování osobních údajů</h1>
			</div>
		</DefaultLayout>
	)
}

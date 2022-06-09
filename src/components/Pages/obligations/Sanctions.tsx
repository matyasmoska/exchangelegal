import { FC } from 'react'
import { SanctionsResult } from '../../../typings'

interface SanctionsProps {
	data?: SanctionsResult
}

const Sanctions: FC<SanctionsProps> = ({ data }) => {
	if (!data || !data.data) {
		return null
	}

	if (data.data && data.data.length === 0) {
		return (
			<div>
				<hr />
				<span className="block mt-4 font-bold">Pro zadané jméno nebyla nalezena žádná shoda.</span>
			</div>
		)
	}

	const results = data.data

	return (
		<div className="overflow-hidden">
			<hr />
			<span className="block mt-4 font-bold">Pro zadané jméno byla nalezena shoda:</span>
			{results.map((sanction, index) => (
				<div key={`sanction-result-${index}`} className="">
					{sanction.legal_acts.data.map((la, index2) => (
						<a key={`sanction-link-${index2}`} className="block text-xs underline border-gray-200 mt-2 truncate ..." href={la.url}>
							{la.url}
						</a>
					))}
				</div>
			))}
		</div>
	)
}

export default Sanctions

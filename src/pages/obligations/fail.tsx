import Link from 'next/link'
import Button from '../../components/Layout/Button'
import DefaultLayout from '../../layouts/DefaultLayout'
import { c } from '../../services/misc'

const ObligationsFailPage = () => {
	return (
		<DefaultLayout>
			<main className="flex items-center justify-center w-full">
				<div
					className={c("flex flex-col items-center justify-center max-w-lg space-y-20", 'md:space-y-10')}
					style={{ height: 'calc(100vh - 200px)' }}
				>
					<div className="flex flex-col items-center space-y-6 text-center">
						<div>
							<img src="/images/thumb-down.svg" className={c("w-16 h-16", 'md:w-20 md:h-20')} />
						</div>
						<h1 className="text-3xl font-bold">AML povinnosti se vás netýkají!</h1>
						<p className="px-6 mx-auto text-center">
							Vaše podnikatelská činnost nespadá pod AML povinnosti. Kliknutím na tlačítko níže se vrátíte
							na úvodní stránku.
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

export default ObligationsFailPage

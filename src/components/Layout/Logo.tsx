import Image from 'next/image'
import Link from 'next/link'
import { useMediaQueries } from '../../hooks/useMediaQueries'

const Logo = () => {
	return (
		<Link href="/">
			<a className="z-50">
				<img alt="pravoprosmenarny.cz" src="/images/logo.svg" className="h-20 w-auto md:h-14" height={80} width={226} />
			</a>
		</Link>
	)
}

export const LogoWhite = () => {
	const { isMd } = useMediaQueries()

	return <Image alt="pravoprosmenarny.cz" src="/images/logo-white.svg" height={isMd ? 53 : 78} width={isMd ? 150 : 220} />
}

export default Logo

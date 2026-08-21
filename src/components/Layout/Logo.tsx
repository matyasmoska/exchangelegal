import Image from 'next/image'
import Link from 'next/link'
import { useMediaQueries } from '../../hooks/useMediaQueries'

const Logo = () => {
	return (
		<Link href="/">
			<a className="z-50">
				<img alt="pravoprosmenarny.cz" src="/images/logo.svg" className="h-14 w-auto md:h-10" height={56} width={158} />
			</a>
		</Link>
	)
}

export const LogoWhite = () => {
	const { isMd } = useMediaQueries()

	return <Image alt="pravoprosmenarny.cz" src="/images/logo-white.svg" height={isMd ? 64 : 106} width={isMd ? 180 : 300} />
}

export default Logo

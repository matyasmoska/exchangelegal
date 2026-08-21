import Image from 'next/image'
import Link from 'next/link'
import { useMediaQueries } from '../../hooks/useMediaQueries'

const Logo = () => {
	return (
		<Link href="/">
			<a className="z-50">
				<img alt="pravoprosmenarny.cz" src="/images/logo.svg" className="h-16 w-auto md:h-12" height={64} width={186} />
			</a>
		</Link>
	)
}

export const LogoWhite = () => {
	const { isMd } = useMediaQueries()

	return <Image alt="pravoprosmenarny.cz" src="/images/logo-white.svg" height={isMd ? 55 : 103} width={isMd ? 160 : 300} />
}

export default Logo

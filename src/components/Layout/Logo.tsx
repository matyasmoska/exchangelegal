import Image from 'next/image'
import Link from 'next/link'
import { useMediaQueries } from '../../hooks/useMediaQueries'

const Logo = () => {
	return (
		<Link href="/">
			<a className="z-50">
				<img alt="smenarny.legal" src="/images/logo.svg" className="h-16 w-auto md:h-11" height={64} width={300} />
			</a>
		</Link>
	)
}

export const LogoWhite = () => {
	const { isMd } = useMediaQueries()

	return <Image alt="smenarny.legal" src="/images/logo-white.svg" height={isMd ? 35 : 140} width={isMd ? 200 : 300} />
}

export default Logo

import Image from 'next/image'
import Link from 'next/link'
import { useMediaQueries } from '../../hooks/useMediaQueries'

const Logo = () => {
	const { isMd } = useMediaQueries()

	return (
		<Link href="/">
			<a className="z-50">
				<img alt="AML solutions" src="/images/logo.svg" height={isMd ? 35 : 40} width={isMd ? 200 : 240} />
			</a>
		</Link>
	)
}

export const LogoWhite = () => {
	const { isMd } = useMediaQueries()

	return <Image alt="AML solutions" src="/images/logo-white.svg" height={isMd ? 35 : 40} width={isMd ? 200 : 240} />
}

export default Logo

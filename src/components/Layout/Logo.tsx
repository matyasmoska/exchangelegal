import Image from 'next/image'
import Link from 'next/link'
import { useMediaQueries } from '../../hooks/useMediaQueries'

const Logo = () => {
	return (
		<Link href="/">
			<a className="z-50">
				<img alt="15zisif.cz" src="/images/logo.svg" height={40} width={148} />
			</a>
		</Link>
	)
}

export const LogoWhite = () => {
	const { isMd } = useMediaQueries()

	return <Image alt="15zisif.cz" src="/images/logo-white.svg" height={isMd ? 35 : 140} width={isMd ? 200 : 300} />
}

export default Logo

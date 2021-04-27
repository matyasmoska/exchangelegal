import Image from 'next/image'
import Link from 'next/link'

const Logo = () => {
	return (
		<Link href="/">
			<a className="z-50">
				<Image alt="AML Solutions Logo" src="/images/logo.png" height={40} width={240} />
			</a>
		</Link>
	)
}

export const LogoWhite = () => {
	return <Image src="/images/logo-white.png" height={40} width={240} />
}

export default Logo

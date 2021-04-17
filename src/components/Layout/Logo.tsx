import Image from 'next/image'

const Logo = () => {
    return (
        <Image src="/images/logo.png" height={40} width={240} />
    )
}

export const LogoWhite = () => {
    return (
        <Image src="/images/logo-white.png" height={40} width={240} />
    )
}

export default Logo;
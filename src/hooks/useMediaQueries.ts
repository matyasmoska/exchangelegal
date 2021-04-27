import { useMediaQuery } from 'react-responsive'
import config from '../../tailwind.config'

export const useMediaQueries = () => {
    const queries = config.theme.screens

    const is3xl = useMediaQuery({ query: `(max-width: ${queries['3xl'].max})` })
    const is2xl = useMediaQuery({ query: `(max-width: ${queries['2xl'].max})` })
    const isXl = useMediaQuery({ query: `(max-width: ${queries['xl'].max})` })
    const isLg = useMediaQuery({ query: `(max-width: ${queries['lg'].max})` })
    const isMd = useMediaQuery({ query: `(max-width: ${queries['md'].max})` })
    const isSm = useMediaQuery({ query: `(max-width: ${queries['sm'].max})` })
    
    return { is3xl, is2xl, isXl, isLg, isMd, isSm }
}
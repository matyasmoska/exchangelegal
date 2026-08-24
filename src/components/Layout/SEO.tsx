import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router'
import pageData from '../../data/src.json'

type MaybeTranslated = string | { cs?: string; en?: string }

const SEO = ({ title = pageData.title, description = pageData.description, keywords = pageData.keywords }: {
    title?: MaybeTranslated
    description?: MaybeTranslated
    keywords?: MaybeTranslated
}) => {
    const { locale, defaultLocale } = useRouter()

    // page metadata may be passed either as a plain string or as { cs, en }
    const pick = (value?: MaybeTranslated) =>
        typeof value === 'string' || value === undefined
            ? value
            : (value as any)[locale as string] || (value as any)[defaultLocale as string] || ''

    title = pick(title) as string
    description = pick(description) as string
    keywords = pick(keywords) as string

    return (
        <NextSeo
            title={title}
            description={description}
            additionalMetaTags={keywords ? [
                {
                    name: "keywords",
                    content: keywords
                }
            ] : undefined}
            openGraph={{
                url: 'https://www.pravoprosmenarny.cz',
                title: pageData.title,
                description: pageData.description,
                site_name: pageData.site_name,
                locale: locale === 'en' ? 'en_GB' : 'cs_CZ',
                images: [
                    {
                        url: 'https://www.pravoprosmenarny.cz/images/hero-smenarna.jpg',
                        alt: 'pravoprosmenarny.cz',
                        width: 1352,
                        height: 602
                    }
                ]
              }}
              twitter={{
                handle: '@pravoprosmenarny',
                site: '@pravoprosmenarny',
                cardType: 'summary_large_image'
              }}
        />
    );
}

export default SEO;

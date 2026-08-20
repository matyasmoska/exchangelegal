import { NextSeo } from 'next-seo';
import pageData from '../../data/src.json'

const SEO = ({ title = pageData.title, description = pageData.description, keywords = pageData.keywords }) => {
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
                url: 'https://www.smenarny.legal',
                title: pageData.title,
                description: pageData.description,
                site_name: pageData.site_name,
                locale: 'cs_CS',
                images: [
                    {
                        url: 'https://www.smenarny.legal/images/background_exchange.jpg',
                        alt: 'smenarny.legal',
                        width: 1352,
                        height: 602
                    }
                ]
              }}
              twitter={{
                handle: '@smenarnylegal',
                site: '@smenarnylegal',
                cardType: 'summary_large_image'
              }}
        />
    );
}

export default SEO;

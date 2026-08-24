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
                url: 'https://www.pravoprosmenarny.cz',
                title: pageData.title,
                description: pageData.description,
                site_name: pageData.site_name,
                locale: 'cs_CS',
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

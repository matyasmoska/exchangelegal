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
                url: 'https://15zisif.cz',
                title: pageData.title,
                description: pageData.description,
                site_name: pageData.site_name,
                locale: 'cs_CS',
                images: [
                    {
                        url: 'https://www.15zisif.cz/images/background.jpg',
                        alt: '15zisif.cz',
                        width: 1352,
                        height: 602
                    }
                ]
              }}
              twitter={{
                handle: '@15zisif',
                site: '@15zisif',
                cardType: 'summary_large_image'
              }}
        />
    );
}

export default SEO;

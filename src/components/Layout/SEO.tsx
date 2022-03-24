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
                url: 'https://amlsolutions.cz',
                title: pageData.title,
                description: pageData.description,
                site_name: pageData.site_name,
                locale: 'cs_CS',
                images: [
                    {
                        url: 'https://www.amlsolutions.cz/_next/image?url=%2Fimages%2Fbackground2.png&w=3840&q=75',
                        alt: 'AML solutions',
                        width: 1352,
                        height: 602
                    }
                ]
              }}
              twitter={{
                handle: '@solutions_aml',
                site: '@solutions_aml',
                cardType: 'summary_large_image'
              }}
        />
    );
}

export default SEO;
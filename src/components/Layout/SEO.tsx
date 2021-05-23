import { NextSeo } from 'next-seo';
import pageData from '../../data/src.json'

const SEO = ({ title = pageData.title }) => {
    return (
        <NextSeo
            title={title}
            description={pageData.description}
            openGraph={{
                url: 'https://amlsolutions.cz',
                title: pageData.title,
                description: pageData.description,
                site_name: pageData.site_name,
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
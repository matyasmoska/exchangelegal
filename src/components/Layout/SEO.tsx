import { NextSeo } from 'next-seo';

const SEO = ({ title = 'Antonín Wingender | Web Applications Developer' }) => {
    return (
        <NextSeo
            title={title}
            description="A full-stack web developer based in Prague. I enjoy creating real web products that users like to use."
            canonical="https://amlsolutions.cz"
            openGraph={{
                url: 'https://amlsolutions.cz',
                title: 'AML Solutions | Praktické řešení na míru vaší AML povinnosti',
                description: 'Praktické řešení na míru vaší AML povinnosti',
                site_name: 'AML Solutions',
              }}
              // twitter={{
              //   handle: '@WingenderA',
              //   site: '@WingenderA',
              //   cardType: 'summary_large_image'
              // }}
        />
    );
}

export default SEO;
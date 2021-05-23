import React, { FC, useEffect, useState } from "react";
import { NewsItem } from "../../../typings";
import { FacebookIcon, TwitterIcon, LinkedInIcon } from "../../Layout/Icons";
// @ts-ignore
import ShareLink from 'react-facebook-share-link'


const ShareArticleLinks: FC<{ article: NewsItem }> = ({ article }) => {
    const [twitterLink, setTwitterLink] = useState('')
    const [facebookLink, setFacebookLink] = useState('')
    const [linkedInLink, setLinkedInLink] = useState('')

    useEffect(() => {
        setTwitterLink('https://twitter.com/intent/tweet?text=' + encodeURI(`${article.name} ${window?.location.href}`))
        setFacebookLink('https://www.facebook.com/sharer/sharer.php?u=' + encodeURI(`${window?.location.href}&t=${article.name}`))
        setLinkedInLink('https://www.linkedin.com/shareArticle?mini=true&url=' + encodeURI(`${window?.location.href}&title=${article.name}&summary=${article.previewText}`))
    }, []);
    
    return (
        <div className="flex items-center space-x-4">
            <span className="text-sm">Sdílejte článek:</span>
            <div className="flex items-center space-x-2">
                <ShareLink link={'https://amlsolutions.cz/news' + article.slug}>
                    {(link: string) => <a href={link} aria-label="Facebook Link" target="_blank">
                        <FacebookIcon className="fill-current w-7 h-7" />
                    </a>}
                </ShareLink>
                <a href={twitterLink} aria-label="Twitter Link" target="_blank">
                    <TwitterIcon className="fill-current w-7 h-7" />
                </a>
                <a href={linkedInLink} aria-label="Linked In Link" target="_blank">
                    <LinkedInIcon className="fill-current w-7 h-7" />
                </a>
            </div>
        </div>
    );
}

export default ShareArticleLinks;
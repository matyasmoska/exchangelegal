import React, { FC, useEffect, useState } from "react";
import { NewsItem } from "../../../typings";
import { FacebookIcon, TwitterIcon, LinkedInIcon } from "../../Layout/Icons";


const ShareArticleLinks: FC<{ article: NewsItem }> = ({ article }) => {
    const [twitterLink, setTwitterLink] = useState('')
    const [facebookLink, setFacebookLink] = useState('')
    const [linkedInLink, setLinkedInLink] = useState('')

    useEffect(() => {
        setTwitterLink('https://twitter.com/intent/tweet?text=' + encodeURI(article.name + ' ' + window?.location.href))
        setFacebookLink('https://www.facebook.com/sharer/sharer.php?href=' + encodeURI(window?.location.href))
        setLinkedInLink('https://www.linkedin.com/shareArticle?url=' + encodeURI(window?.location.href || ''))
    }, []);
    
    return (
        <div className="flex items-center space-x-4">
            <span className="text-sm">Sdílejte článek:</span>
            <div className="flex items-center space-x-2">
                <a href={facebookLink} aria-label="Facebook Link" target="_blank">
                    <FacebookIcon className="fill-current w-7 h-7" />
                </a>
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
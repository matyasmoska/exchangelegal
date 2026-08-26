module.exports = {
    siteUrl: process.env.SITE_URL || 'https://www.pravoprosmenarny.cz',
    generateRobotsTxt: true,
    priority: 0.7,
    // Both language versions belong in the sitemap, each pointing at the other.
    alternateRefs: [
        { href: 'https://www.pravoprosmenarny.cz', hreflang: 'cs' },
        { href: 'https://www.pravoprosmenarny.cz/en', hreflang: 'en' },
    ],
}

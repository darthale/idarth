const queries = require(`./src/utils/algolia`)
const macros = require(`./src/utils/katex`)

require(`dotenv`).config()

module.exports = {
  siteMetadata: {
    title: `idarth.com`,
    description: `Turnin pizza into code.`,
    author: `Alessio Gastaldo`,
    url: `https://idarth.com`,
  },
  plugins: [
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-smartypants`,
          `gatsby-remark-embed-video`,
          `gatsby-remark-responsive-iframe`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-code-titles`,
          `gatsby-remark-vscode`,
          `gatsby-remark-sub-sup`,
          `gatsby-remark-autolink-headers`,
          {
            resolve: `gatsby-remark-katex`,
            options: { macros },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
              linkImagesToOriginal: false,
              wrapperStyle: `border-radius: 0.5em; overflow: hidden;`,
            },
          },
          {
            resolve: `gatsby-remark-emojis`,
            options: {
              active: true,
              size: 24,
            },
          },
        ],
      },
    },
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content`,
        ignore: process.env.NODE_ENV === `production` && [`**/posts/drafts`],
      },
    },
    `gatsby-transformer-yaml`,
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: `./content/idarth.jpg`,
      },
    },
    {
      resolve: 'gatsby-plugin-s3',
      options: {
        bucketName: 'idarth.com',
      },
    },
    `gatsby-plugin-lodash`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-netlify-cache`,
  ],
}

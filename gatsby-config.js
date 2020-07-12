require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

const contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  host: process.env.CONTENTFUL_HOST
}

const { spaceId, accessToken } = contentfulConfig

if (!spaceId || !accessToken) {
  throw new Error(
    'Contentful spaceId and the access token need to be provided.'
  )
}

module.exports = {
  siteMetadata: {
    title: "Dan Makovec",
    siteUrl: "https://dan.makovec.net",
    description: "Musings of a geek",
  },
  pathPrefix: '/',
  plugins: [
    'gatsby-plugin-arengu-forms',
    'gatsby-plugin-client-side-redirect',
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds:
          [
            {
              serialize: ({ query: { site, allContentfulBlogPost } }) => {
                return allContentfulBlogPost.edges.map(edge => {
                  return Object.assign({}, {
                    title: edge.node.title,
                    description: edge.node.description.childMarkdownRemark.html,
                    date: edge.node.publishDate,
                    url: site.siteMetadata.siteUrl + edge.node.slug,
                    guid: site.siteMetadata.siteUrl + edge.node.slug,
                    custom_elements: [
                      {
                        "content:encoded": edge.node.body.childMarkdownRemark.html
                      }
                    ]

                  })
                })
              },
              query: `
              {
                allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
                  edges {
                    node {
                      title
                      slug
                      publishDate
                      description {
                        childMarkdownRemark {
                          html
                        }
                      }
                      body {
                        childMarkdownRemark {
                          html
                        }
                      }
                    }
                  }
                }
              }`,
              output: "/feed",
              title: "Dan Makovec's site",
            }
          ],
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Dan Makovec's Site`,
        short_name: `Dan M`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#ffffff`,
        display: `standalone`,
        icon: `static/8-bit.png`
      },
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `blue`,
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-remove-trailing-slashes',
    'gatsby-plugin-robots-txt',
    'gatsby-plugin-sass',
    'gatsby-plugin-sharp',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-typescript',
    {
      resolve: 'gatsby-source-contentful',
      options: contentfulConfig,
    },
    'gatsby-transformer-remark',
    'gatsby-transformer-sharp',
  ],
}

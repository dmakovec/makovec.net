import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import styles from './blog.module.scss'
import Layout from '../components/layout'
import ArticlePreview from '../components/article-preview'

interface Post {
  node: {
    slug: string
  }
}

const TITLE = "Useful Stuff";

class BlogIndex extends React.Component<PageProps> {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts: Post[] = get(this, 'props.data.allContentfulBlogPost.edges')

    return (
      <Layout location={this.props.location}>
        <div className="content">
          <Helmet title={TITLE}>
            <meta name="description" content="Tidbits of info on various tech things" />

          </Helmet>
          <div className="wrapper">
            <h1 className="section-headline">{TITLE}</h1>
            <ul className="article-list">
              {posts.map(({ node }) => {
                return (
                  <li key={node.slug}>
                    <ArticlePreview article={node} />
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query BlogIndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "MMMM Do, YYYY")
          tags
          heroImage {
            fluid(maxWidth: 240, maxHeight: 250, resizingBehavior: SCALE) {
              ...GatsbyContentfulFluid
            }
          }
          description {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`

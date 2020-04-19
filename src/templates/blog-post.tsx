import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import { Link } from 'gatsby'
import _ from "lodash"

import heroStyles from '../components/hero.module.scss'
import tagStyles from '../components/tags.module.scss'

class BlogPostTemplate extends React.Component<PageProps> {
  render() {
    const post = get(this.props, 'data.post')

    return (
      <Layout location={this.props.location}>
        <Helmet>
          <title>{post.title}</title>
          <meta name="description" content={post.description.childMarkdownRemark.excerpt} />
          <meta name="keywords" content={post.tags.join()} />

        </Helmet>
        <div className="content">
          <div style={{ height: "200px", margin: "0 auto", overflow: "hidden", width: "200px" }} className={heroStyles.hero}>
            <Img
              alt={post.title}
              fluid={post.heroImage.fluid}
            />
          </div>
          <div className="wrapper">
            <h1 className="section-headline">{post.title}</h1>
            <p
              style={{
                display: 'block',
              }}
            >
              {post.publishDate}
            </p>
            <div style={{ fontStyle: "italic" }}
              dangerouslySetInnerHTML={{
                __html: post.description.childMarkdownRemark.html,
              }}
            />
            <div
              dangerouslySetInnerHTML={{
                __html: post.body.childMarkdownRemark.html,
              }}
            />
            <hr/>
            {post.tags &&
              post.tags.map((tag: string) => (
                <p className={tagStyles.tag} key={tag}>
                  <Link to={`/tag/${_.kebabCase(tag)}`}>{tag}</Link>
                </p>
              ))}

          </div>
        </div>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    post: contentfulBlogPost(slug: { eq: $slug }) {
      tags
      title
      description {
        childMarkdownRemark {
          html
          excerpt(format: PLAIN)
        }
      }
      tags
      publishDate(formatString: "MMMM Do, YYYY")
      heroImage {
        fluid(maxHeight: 200, background: "rgb:ffffff") {
          ...GatsbyContentfulFluid
        }
      }
      body {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`

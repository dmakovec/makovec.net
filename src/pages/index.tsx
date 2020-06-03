import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Hero from '../components/hero'
import Layout from '../components/layout'

class RootIndex extends React.Component<PageProps> {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const [author] = get(this, 'props.data.allContentfulPerson.edges')
    const blurb = get(this, 'props.data.contentfulText.content.childMarkdownRemark.html')
    return (
      <Layout location={this.props.location}>
        <div className="content">
          <Helmet>
            <title>Open Source Developer</title>
            <meta name="title" content="Dan Makovec - Open Source Developer" />
            <meta name="description" content="The home page of Dan Makovec, open source developer in Melbourne, Australia" />
          </Helmet>
          <Hero data={author.node} />
          <div className="wrapper">
            <div
              dangerouslySetInnerHTML={{
                __html: blurb,
              }}
            />
          </div>
        </div>
      </Layout>
    )
  }
}

export default RootIndex

export const pageQuery = graphql`
  query HomeQuery {
    site {
      siteMetadata {
        title
      }
    }
    contentfulText(name: { eq: "Home page blurb"}) {
      content {
        childMarkdownRemark {
          html
        }
      }
    }
    allContentfulPerson(
      filter: { contentful_id: { eq: "15jwOBqpxqSAOy2eOO4S0m" } }
    ) {
      edges {
        node {
          name
          shortBio {
            shortBio
          }
          title
          heroImage: image {
            fluid(
              maxWidth: 1180
              maxHeight: 480
              resizingBehavior: PAD
              background: "rgb:000000"
            ) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
        }
      }
    }
  }
`

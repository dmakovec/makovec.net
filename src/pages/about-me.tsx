import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Layout from '../components/layout'

class AboutIndex extends React.Component {
    render() {
        const page = get(this.props, 'data.contentfulPage')
        const siteTitle = get(this.props, 'data.site.siteMetadata.title')

        return (
            <Layout location={this.props.location}>
                <div style={{ background: '#fff' }}>
                    <Helmet title={`${siteTitle} | ${page.title}`} />
                    <div className="wrapper">
                        <h1 className="section-headline">{page.title}</h1>

                    <div
                        dangerouslySetInnerHTML={{
                            __html: page.body.childMarkdownRemark.html,
                        }}
                    />
                    </div>

                </div>
            </Layout>
        )
    }
}

export default AboutIndex

export const pageQuery = graphql`
  {
    site {
        siteMetadata {
          title
        }
      }
      contentfulPage(slug: {eq: "about-me"}) {
        title
        body {
          childMarkdownRemark {
            html
          }
        }
      }
  }
`

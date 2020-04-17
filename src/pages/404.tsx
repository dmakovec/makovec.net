import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Layout from '../components/layout'


class NotFound extends React.Component {
    render() {
        const siteTitle = get(this.props, 'data.site.siteMetadata.title')

        return (
            <Layout location={this.props.location}>
                <div style={{ background: '#fff' }}>
                    <Helmet title="Not Found" />
                    <div className="wrapper">
                        <h1 className="section-headline">Uh oh</h1>

                        <div>
                            <p>Sorry, I can't find the page you're looking for!</p>
                        </div>
                    </div>

                </div>
            </Layout>
        )
    }
}

export default NotFound

export const pageQuery = graphql`
  {
    site {
        siteMetadata {
          title
        }
      }
  }
`

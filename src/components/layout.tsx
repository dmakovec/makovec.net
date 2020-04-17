import React from 'react'
import Helmet from 'react-helmet'
import base from './base.scss'
import Container from './container'
import Navigation from './navigation'
import Footer from './footer'
import './base.scss'


class Layout extends React.Component<PageProps> {
  render() {
    const { location, children } = this.props

    let rootPath = `/`
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`
    }

    return (
      <Container>
        <Helmet titleTemplate="%s | Dan Makovec">
          <meta name="author" content="Dan Makovec" />
        </Helmet>
        <Navigation location={location} />
        {children}
        <Footer />
      </Container>
    )
  }
}

export default Layout


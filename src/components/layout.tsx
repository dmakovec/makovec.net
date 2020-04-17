import React from 'react'
import { Link } from 'gatsby'
import base from './base.scss'
import Container from './container'
import Navigation from './navigation'
import Footer from './footer'
import './base.scss'

interface Props {
  location: object,
  children: any
}

class Layout extends React.Component<Props> {
  render() {
    const { location, children } = this.props

    let rootPath = `/`
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`
    }

    return (
      <Container>
        <Navigation location={location} />
        {children}
        <Footer />
      </Container>
    )
  }
}

export default Layout


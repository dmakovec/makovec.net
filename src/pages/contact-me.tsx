import React from "react"
import Helmet from 'react-helmet'
import { ArenguForm } from "gatsby-plugin-arengu-forms"
import Layout from '../components/layout'
import './contact-me.scss'

class ContactMe extends React.Component<PageProps> {
  render() {
    console.log(this.props)
    return (
      <Layout location={this.props.location}>
        <Helmet title="Contact Me!" />
        <div className="content">
          <div className="wrapper">
            <h1 className="section-headline">Contact Me</h1>

            <ArenguForm id="158701469163253081" />
          </div>
        </div>
      </Layout>
    )
  }
}

export default ContactMe
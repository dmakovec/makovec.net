import React from "react"
import Helmet from 'react-helmet'
import { ArenguForm } from "gatsby-plugin-arengu-forms"
import Layout from '../components/layout'
import './contact-me.scss'

const TITLE = "Contact Me!";
const DESCRIPTION = "Get in touch with Dan"

class ContactMe extends React.Component<PageProps> {
  render() {
    return (
      <Layout location={this.props.location}>
        <Helmet title={TITLE}>
          <meta name="title" content={TITLE} />
          <meta name="description" content={DESCRIPTION} />
        </Helmet>

        <div className="content">
          <div className="wrapper">
            <h1 className="section-headline">{TITLE}</h1>

            <ArenguForm id="158701469163253081" />
          </div>
        </div>
      </Layout>
    )
  }
}

export default ContactMe
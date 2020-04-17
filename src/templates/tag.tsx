import React from "react"
import { Link, graphql } from "gatsby"
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import ArticlePreview from '../components/article-preview'
import styles from './blog.module.scss'

interface Props extends PageProps {
    pageContext: {
        tag: string
    },
    data: {
        pages: {
            totalCount: number
            edges: {
                node: {
                    slug: string
                }
            }[]
        }
    }
}
class Tag extends React.Component<Props> {
    render() {
        const { tag } = this.props.pageContext
        const { edges } = this.props.data.pages

        const totalCount = edges.length;

        const tagHeader = `${totalCount} post${
            totalCount === 1 ? "" : "s"
            } tagged with "${tag}"`

        return (
            <Layout location={this.props.location}>
                <Helmet title={tagHeader} />
                <div className="content">

                    <div className="wrapper">
                        <h1 className="section-headline">{tagHeader}</h1>
                        <ul className="article-list">
                            {edges.map(({ node }) => {
                                const { slug } = node
                                return (
                                    <li key={slug}>
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

export default Tag

export const pageQuery = graphql`
    query($tag: String) {
        pages: allContentfulBlogPost(sort: {fields: [publishDate], order: DESC}, filter: {tags: {in: [$tag]}}) {
            edges {
                node {
                    title
                    slug
                    publishDate(formatString: "MMMM Do, YYYY")
                    tags
                    heroImage {
                        fluid(maxWidth: 240, maxHeight: 250, resizingBehavior: SCALE) {
                            ...GatsbyContentfulFluid_tracedSVG
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
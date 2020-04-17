import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import styles from './article-preview.module.scss'

export default function ({ article }) {
  return (
    <div className={styles.preview}>
      <Link to={`/useful-stuff/${article.slug}`}>
      <Img alt="" fluid={article.heroImage.fluid} />
      <h3 className={styles.title}>
        {article.title}
      </h3>
      </Link>
      <small>{article.publishDate}</small>
      <div
        dangerouslySetInnerHTML={{
          __html: article.description.childMarkdownRemark.html,
        }}
      />
      {article.tags &&
        article.tags.map((tag: string) => (
          <p className={styles.tag} key={tag}>
            {tag}
          </p>
        ))}
    </div>
  )
}

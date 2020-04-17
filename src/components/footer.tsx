import React from 'react'
import Img from 'gatsby-image'

import * as styles from './footer.module.scss'
const year = (new Date()).getFullYear();

export default () => (
  <div className={styles.footer}>
    &copy; 2000 - {year} Dan Makovec
  </div>
)

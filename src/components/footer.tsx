import React from 'react'
import Img from 'gatsby-image'

import * as styles from './footer.module.scss'
console.log("footer styles")
console.log(styles);
const year = (new Date()).getFullYear();

export default () => (
  <div className={styles.footer}>
    &copy; 2000 - {year} Daniel Makovec
  </div>
)

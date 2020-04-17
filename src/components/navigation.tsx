import React from 'react'
import { Link } from 'gatsby'
import { FaAlignRight } from 'react-icons/fa'
import styles from './navigation.module.scss'

const items = [
  {
    'title': 'Home',
    'url': '/',
  },
  {
    'title': 'About Me',
    'url': '/about-me',
  },
  {
    'title': 'Useful Stuff',
    'url': '/useful-stuff',
  },
  {
    'title': 'My CV (LinkedIn)',
    'url': 'https://www.linkedin.com/in/dmakovec',
  },
  {
    'title': 'Contact Me',
    'url': '/contact-me/',
  },
];


export default class Navigation extends React.Component<PageProps> {
  state = {
    toggle: false
  }
  Toggle = () => {
    this.setState({ toggle: !this.state.toggle })
  }

  render() {
    const {location} = this.props;
    const links: object[] = [];

    items.forEach((item, index) => {
      let className = styles.navigationItem;
      if (item.url === location.pathname || (item.url.length > 1 && location.pathname.substring(0, item.url.length) === item.url)) {
        className += ` ${styles.active}`
      }
      links.push(
        (<li className={className} key={index}>
          <Link to={item.url}>{item.title}</Link>
        </li>)
      )

    });
    return (
      <nav role="navigation" className={this.state.toggle ? styles.activeNav : ""}>
        <button className={styles.navButton} onClick={this.Toggle}>
          <FaAlignRight />
        </button>
        <ul className={this.state.toggle ? `${styles.navLinks} ${styles.showNav}` : styles.navLinks}>
          {links}
        </ul>
      </nav>
    )
  }
}

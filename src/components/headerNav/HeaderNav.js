import { NavLink } from 'react-router-dom'
import styles from './HeaderNav.module.css'

const Navigation = ({ isMobileMenuOpen, handleNavLink }) => {

  return (
    <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.open : styles.close}`}>
      <ul className={styles.nav}>
        <li className={styles.navItem}>
          <NavLink to={'/'} onClick={handleNavLink} className={({ isActive }) => (isActive ? `${styles.activeLink} ${styles.navLink}` : `${styles.navLink}`)}>Home</NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink to={'/products'} onClick={handleNavLink} className={({ isActive }) => (isActive ? `${styles.activeLink} ${styles.navLink}` : `${styles.navLink}`)}>Products</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
import { Link } from 'react-router-dom'
import styles from './Footer.module.css'
import Logo from '../../components/logo/Logo'
import { Mail, Phone } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer>
      <div className={`${styles.footerContainer} container`}>
        <Link to="/" className={styles.footerLogo}><Logo /></Link>
        <h4>
          <Link to='products' className={`action-color ${styles.marketLink}`}>Visit our Market</Link>
        </h4>
        <p className={styles.contact}>Contact our manager:{' '}
          <a className='action-color' href='tel: +380967777777'>
            <Phone className={styles.iconHeight} />
            +38 (096) 77-77-777
          </a>
          <a className='action-color' href='mailto: @testmail@test.com'>
            <Mail className={styles.iconHeight} />
            @testmail@test.com
          </a>
        </p>
      </div>
      <p className={`${styles.copyright} container`}>&copy; Copyright {currentYear}. All rights reserved.</p>
    </footer>
  )
}

export default Footer
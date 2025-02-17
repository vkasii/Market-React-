import { Link } from 'react-router-dom'
import styles from './HeroBanner.module.css'

const HeroBanner = () => {
  return (
    <section className={styles.heroBanner}>
      <div className={styles.heroContent}>
        <h1>Discover Style & Quality</h1>
        <p>Shop the best products at unbeatable prices. Free shipping & daily discounts!</p>
        <Link to="/products" className={styles.heroButton}>Start Shopping</Link>
      </div>
    </section>
  )
}

export default HeroBanner
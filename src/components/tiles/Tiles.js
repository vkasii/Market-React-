import { Link } from 'react-router-dom'
import styles from './Tiles.module.css'
import Spinner from '../spinner/Spinner'
import { useSelector } from 'react-redux'
import { getCategoriesAmount, getUniqueCategories } from '../../redux/productsSlice/productsSlice'

const Tiles = () => {
  const { loading, error } = useSelector(state => state.products)
  const categories = useSelector(getUniqueCategories)
  const countedCategories = useSelector(getCategoriesAmount)

  const darkMode = useSelector(state => state.darkMode.value)

  return (
    <>
      {loading ?
        <Spinner />
        : error
          ? <p>Something went wrong</p>
          : <section className={`${styles.tileSection} container`}>
            <h2 className={styles.tilesTitle}>Find Your Favorite Category</h2>
            <div className={styles.tilesContainer}>
              {categories.map((category) => (
                <Link key={category} to={`/products/${category}`} className={`${darkMode ? '' : styles.tileWhite} ${styles.tile}`}>
                  <h3>{category}</h3>
                  <p>Hurry, {countedCategories[category]} offers remaining. Click to browse all {category} items.</p>
                </Link>
              ))}
            </div>
          </section>
      }
    </>

  )
}

export default Tiles
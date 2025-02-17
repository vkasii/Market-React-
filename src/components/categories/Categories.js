import { useSelector } from 'react-redux';
import styles from './Categories.module.css'

const Categories = ({ categories, currentCategory, setCurrentCategory }) => {
  const darkMode = useSelector(state => state.darkMode.value)

  return (
    <div className={styles.categoriesContainer}>
      {categories.map(category => (
        <button
          key={category}
          className={`${styles.categoryItem} ${category === currentCategory ? styles.activeCategory : ''} ${darkMode ? styles.darkCategory : '' }`}
          type='button'
          onClick={() => setCurrentCategory(category)}>
          {category}
        </button>
      ))}
    </div>
  );
}

export default Categories;

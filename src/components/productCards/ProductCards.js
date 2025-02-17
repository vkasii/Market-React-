import { useEffect, useState } from 'react';
import styles from './ProductCards.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, removeProduct, initCart } from '../../redux/cartProductsSlice/cartProductsSlice';
import { getUniqueCategories } from '../../redux/productsSlice/productsSlice'
import Categories from '../categories/Categories';
import ProductCard from '../productCard/ProductCard';
import Spinner from '../spinner/Spinner';
import { useParams } from 'react-router-dom';

const ProductCards = () => {
  const { category } = useParams()

  const [filteredProducts, setFilteredProducts] = useState([])
  const [currentCategory, setCurrentCategory] = useState(category || 'all')

  const cartProducts = useSelector(state => state.cart.cartProducts)
  const { products, loading, error } = useSelector(state => state.products)
  const categories = useSelector(getUniqueCategories)
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(initCart());
  }, [])

  useEffect(() => {
    if (!currentCategory || currentCategory === 'all') {
      return setFilteredProducts(products)
    }
    return setFilteredProducts(products.filter(product => product.category === currentCategory && product))

  }, [products, currentCategory])

  function isProductInCart(id) {
    return cartProducts.some(product => product.id === id)
  }

  function addProductToCart(product) {
    dispatch(addProduct({ ...product, amount: 1, summ: product.price }))
  }

  function removeProductFromCart(id) {
    dispatch(removeProduct(id));
  }

  return (
    <div className='container'>
      <Categories categories={['all', ...categories]} currentCategory={currentCategory} setCurrentCategory={setCurrentCategory} />
      {loading
        ? <Spinner />
        : error
          ? <p style={{ textAlign: 'center' }}>Sorry, there is an issue with the server. We are working hard to fix it as soon as possible</p>
          : <div className={styles.cardsContainer}>
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                addProductToCart={addProductToCart}
                removeProductFromCart={removeProductFromCart}
                isProductInCart={isProductInCart}
              />
            ))}
          </div>}
    </div >
  )
}

export default ProductCards
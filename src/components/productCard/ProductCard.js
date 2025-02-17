import { useSelector } from 'react-redux';
import Cart from '../cart/Cart';
import styles from './ProductCard.module.css';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import Spinner from '../spinner/Spinner';

const ProductCard = ({ product, addProductToCart, removeProductFromCart, isProductInCart }) => {
  const inCart = isProductInCart(product.id);
  const [isLoading, setIsLoading] = useState(true)

  const darkMode = useSelector(state => state.darkMode.value)

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div key={product.id} className={`${darkMode ? '' : styles.whiteCard} ${styles.cardItem}`}>
      {isLoading && <Spinner />}
      <img src={product.thumbnail} onLoad={handleImageLoad} className={styles.cardImage} alt={product.title} loading='lazy' />
      <div className={styles.cardContainer}>
        <h4 className={styles.productCardTitle}>
          <Link to={`/product/${product.id}`}>{product.title}</Link>
        </h4>
        <p className={styles.cardInfo}>Price: <span className='action-color'>${product.price}</span></p>
        <p className={styles.detail}>Category: <strong>{product.category}</strong></p>
        <div className={styles.buttonsContainer}>
          <Link className={styles.detailBtn} to={`/product/${product.id}`}>Details</Link>
          {
            inCart
              ? <Cart onClick={() => removeProductFromCart(product.id)} badge={String.fromCharCode(10003)} className={styles.added} />
              : <Cart onClick={() => addProductToCart(product)} />
          }
        </div>
      </div>
    </div>
  );
}

export default ProductCard;

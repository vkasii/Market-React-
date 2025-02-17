import styles from './CartModal.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart, toggleCart } from '../../redux/cartProductsSlice/cartProductsSlice';
import CartItem from '../cartItem/CartItem';
import { Link } from 'react-router-dom';

const Cart = () => {

  const cartProducts = useSelector(state => state.cart.cartProducts);
  const isCartOpen = useSelector(state => state.cart.isCartOpen)
  const darkMode = useSelector(state => state.darkMode.value)
  const dispatch = useDispatch();

  function toggleCartState() {
    dispatch(toggleCart());
  }

  function handleClearCart() {
    dispatch(clearCart());
  }

  function handleCheckout() {
    dispatch(toggleCart());
    localStorage.setItem('orderCompleted', 'false');
  }

  return (
    <>
      <div className={`${styles.cartContainer} ${isCartOpen ? styles.open : ""}`}>
        <div
          onClick={toggleCartState}
          className={`${styles.backdrop} ${darkMode ? styles.backdropDark : styles.backdropLight}`}
        ></div>
        <div className={styles.cart}>
          <h2 className={styles.title}>Products Cart</h2>

          {cartProducts.length === 0 ? (
            <div className={styles.emptyContainer}>
              <p className={styles.empty}>Your cart is empty</p>
            </div>
          ) : (
            <>
              <ul className={styles.cartList}>
                {cartProducts.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </ul>
              <p className={styles.totalSumm}>Summ: <span className='action-color'>${cartProducts.reduce((total, item) => +(total + item.summ).toFixed(2), 0)}</span></p>
              <div className={styles.actions}>
                <button className='default-btn neutral-btn' onClick={handleClearCart}>Clear Cart</button>
                <Link to='./checkout' className='default-btn brand-btn' onClick={handleCheckout}>Chekout</Link>
              </div>
            </>
          )}
        </div>
      </div >
    </>
  );
};

export default Cart;

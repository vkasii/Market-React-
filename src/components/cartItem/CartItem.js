import { useDispatch } from 'react-redux';
import styles from './CartItem.module.css';
import { removeProduct } from '../../redux/cartProductsSlice/cartProductsSlice';
import AmountSelector from '../amountSelector/AmountSelector';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  function handleRemove(id) {
    dispatch(removeProduct(id));
  }

  return (
    <li className={styles.cartItem}>
      <img src={item.thumbnail} alt={item.title} className={styles.image} />
      <div className={styles.details}>
        <h3 className={styles.productTitle}>{item.title}</h3>
        <p className={styles.price}>${item.price}</p>
      </div>
      <div className={styles.cartItemActions}>
        <AmountSelector item={item} />
        <span className={`${styles.itemSumm} action-color`}>${item.summ}</span>
        <button
          className={styles.removeBtn}
          onClick={() => handleRemove(item.id)}
        >
          Remove
        </button>
      </div>
    </li>
  )
}

export default CartItem
import { ShoppingCart } from "lucide-react"
import styles from './Cart.module.css'

const Cart = ({ onClick, badge, className }) => {
  return (
    <button onClick={onClick} className={`${styles.cart} ${className}`}>
      <ShoppingCart size={24} />
      <span className={styles.badge}>{badge}</span>
    </button>
  )
}

export default Cart
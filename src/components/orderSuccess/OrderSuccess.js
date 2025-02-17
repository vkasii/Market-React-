import styles from './OrderSuccess.module.css'

const OrderSuccess = () => {
  return (
    <div className={styles.thankYouMessage}>
      <h2 className={styles.title}>Thank you for your order!</h2>
      <p>Our manager will contact you shortly to confirm the details.</p>
    </div>
  )
}

export default OrderSuccess
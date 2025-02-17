import { useEffect, useState } from 'react';
import styles from './CheckoutComponent.module.css'
import OrderSuccess from '../orderSuccess/OrderSuccess';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../redux/cartProductsSlice/cartProductsSlice';
import { useNavigate } from 'react-router-dom';

const CheckoutComponent = () => {
  const navigate = useNavigate();

  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch()

  const phoneRegex = /^\+38(0\d{9})$/;

  const handleChange = (event) => {
    setPhone(event.target.value);
  };

  useEffect(() => {
    localStorage.getItem('orderCompleted') === 'true' && navigate('/products')
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!phoneRegex.test(phone)) {
      setError('Please enter a valid phone number in the format +380XXXXXXXXX');
      return;
    }
    setError('');
    setSuccess(true);
    dispatch(clearCart());

    localStorage.setItem('orderCompleted', 'true');

    setTimeout(() => {
      navigate('/')
    }, 7000)
  };

  return (
    <>
      {success ? <OrderSuccess /> :
        <div className='container'>
          <h2 className={styles.title}>Checkout</h2>
          <form className={styles.checkoutForm} onSubmit={handleSubmit}>
            <label htmlFor='contact-number'>Enter your phone number, and our manager will contact you to confirm your order.</label>
            <input id='contact-number' value={phone} type='tel' onChange={handleChange} placeholder="+380XXXXXXXXX" />
            <div className={styles.validationContainer}>
              {error && <p className={`${styles.checkoutError} error-color`}>{error}</p>}
              <button type='submit' className='default-btn brand-btn'>Confirm</button>
            </div>
          </form>
        </div>
      }
    </>

  )
}

export default CheckoutComponent
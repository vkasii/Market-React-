import styles from './AmountSelector.module.css'
import { useDispatch } from 'react-redux';
import { setCartItemAmount } from '../../redux/cartProductsSlice/cartProductsSlice';
import { Minus, Plus } from 'lucide-react';

const AmountSelector = ({ item }) => {
  const dispatch = useDispatch();

  function increaseAmount() {
    const updatedAmount = item.amount + 1;
    const payload = {
      id: item.id,
      amount: updatedAmount,
      summ: +(updatedAmount * item.price).toFixed(2)
    }
    dispatch(setCartItemAmount(payload))
  }

  function decreaseAmount() {
    const updatedAmount = item.amount - 1;
    const payload = {
      id: item.id,
      amount: updatedAmount,
      summ: +(updatedAmount * item.price).toFixed(2)
    }
    item.amount > 1 && dispatch(setCartItemAmount(payload))
  }

  function amountHandler(event) {
    const newAmount = event.target.value;
    if (event.target.value === '') {
      const payload = {
        id: item.id,
        amount: '',
        summ: item.price
      }
      dispatch(setCartItemAmount(payload));
    } else if (!isNaN(newAmount) && +newAmount > 0) {
      const payload = {
        id: item.id,
        amount: +newAmount,
        summ: +(newAmount * item.price).toFixed(2)
      }
      dispatch(setCartItemAmount(payload));
    }
  }

  function handleAmountOnBlur(event) {
    const newAmount = event.target.value;
    if (newAmount === '') {
      const payload = {
        id: item.id,
        amount: 1,
        summ: item.price
      }
      dispatch(setCartItemAmount(payload));
    }
    return
  }

  return (
    <div className={styles.amountSelectorContainer}>
      <button onClick={decreaseAmount}>
        <Minus />
      </button>
      <input value={item.amount} type="number" onChange={amountHandler} onBlur={handleAmountOnBlur} />
      <button onClick={increaseAmount}>
        <Plus />
      </button>
    </div>
  )
}

export default AmountSelector
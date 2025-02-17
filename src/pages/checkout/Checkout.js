import { useEffect } from "react";
import CheckoutComponent from "../../components/checkout/CheckoutComponent"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleCart } from "../../redux/cartProductsSlice/cartProductsSlice";


const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.getItem('orderCompleted') === 'true') {
      navigate('/products');

      dispatch(toggleCart())
    }
  }, []);

  return (
    <>
      <CheckoutComponent />
    </>
  )
}

export default Checkout
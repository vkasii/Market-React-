export const initCartAction = () => {
  const storedCart = localStorage.getItem('cartItems')
  return storedCart ? JSON.parse(storedCart) : []
}

export const addProductAction = (cartProducts, payload) => {
  cartProducts = [...cartProducts, payload]
  localStorage.setItem('cartItems', JSON.stringify(cartProducts))
  return cartProducts
}

export const removeProductAction = (cartProducts, payload) => {
  cartProducts = cartProducts.filter(item => item.id !== payload)
  localStorage.setItem('cartItems', JSON.stringify(cartProducts))
  return cartProducts
}

export const toggleCartAction = (isCartOpen) => {
  return isCartOpen = !isCartOpen
}

export const setCartItemAmountAction = (cartProducts, payload) => {
  const { id, amount, summ } = payload
  cartProducts = cartProducts.map(product =>
    product.id === id ? { ...product, amount, summ } : product
  )
  localStorage.setItem('cartItems', JSON.stringify(cartProducts))
  return cartProducts
}

export const clearCartAction = (cartProducts) => {
  localStorage.removeItem('cartItems')
  cartProducts = []
  localStorage.setItem('orderCompleted', 'true');
  return cartProducts
}
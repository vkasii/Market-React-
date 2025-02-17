import './App.css';
import { useEffect } from 'react';
import Header from './layouts/header/Header';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import Products from './pages/products/Products';
import NotFound from './pages/notFound/NotFound';
import Detail from './pages/detail/DetailPage';
import Footer from './layouts/footer/Footer';
import CheckoutComponent from './components/checkout/CheckoutComponent';
import { useDispatch } from 'react-redux';
import { fetchProducts } from './redux/productsSlice/productsSlice';

function App() {

  const dispatch = useDispatch()
  useEffect(() => {
    getLocalStorageThemeColor()
    dispatch(fetchProducts());
  }, [dispatch]);

  function getLocalStorageThemeColor() {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      document.body.classList.add(storedTheme);
    }
  }

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/products' element={<Products />} />
          <Route path='/product/:id' element={<Detail />} />
          <Route path='/products/:category' element={<Products />} />
          <Route path='/checkout' element={<CheckoutComponent />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;

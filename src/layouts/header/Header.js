import styles from "./Header.module.css";
import { useEffect, useState } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../../redux/themeModeSlice";
import { initCart, toggleCart } from '../../redux/cartProductsSlice/cartProductsSlice'
import Navigation from "../../components/headerNav/HeaderNav";
import Logo from "../../components/logo/Logo";
import CartModal from "../../components/cartModal/CartModal";
import Cart from "../../components/cart/Cart";

const Header = () => {
  const darkMode = useSelector((state) => state.darkMode.value);

  const isCartOpen = useSelector(state => state.cart.isCartOpen)
  const cartProducts = useSelector(state => state.cart.cartProducts)
  const dispatch = useDispatch();
  

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  useEffect(() => {
    dispatch(initCart());
    const themeLS = JSON.parse(localStorage.getItem("theme"));
    if (themeLS !== null) {
      dispatch(toggleDarkMode(themeLS));
    }
  }, [dispatch]);

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleMobileMenu = () => {
    if (isCartOpen) {
      dispatch(toggleCart());
    }
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleTheme = () => {
    const newTheme = !darkMode;
    dispatch(toggleDarkMode(newTheme));
    localStorage.setItem("theme", JSON.stringify(newTheme));
  };

  function handleNavLink() {
    setIsMobileMenuOpen(false);
    isCartOpen && dispatch(toggleCart())
  }

  function toggleCartState() {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
    dispatch(toggleCart());
  }

  return (
    <>
      <header className={styles.headerBG}>
        <div className={`${styles.headerContainer} container`}>
          <Link to="/" className={styles.headerLogo} onClick={handleNavLink}>
            <Logo />
          </Link>
          <Navigation isMobileMenuOpen={isMobileMenuOpen} handleNavLink={handleNavLink} />

          {/* Cart and theme toggler buttons */}
          <div className={styles.actions}>
            <button onClick={toggleTheme} className={styles.themeToggle}>
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <Cart onClick={toggleCartState} badge={cartProducts.length} />
          </div>

          {/* Mobile menu toggler */}
          <button
            className={`${styles.mobileMenuToggle} ${isMobileMenuOpen ? styles.openIcon : ""}`}
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </header>
      <CartModal />
    </>
  );
};

export default Header;

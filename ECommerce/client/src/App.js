import { React, useState } from 'react';

import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './Home';
import ProductPage from '../src/components/ProductPage';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Electronics from './components/Electronics';
import HomeAppliances from './components/HomeAppliances';
import Gaming from './components/Gaming';
import Books from './components/Books';
import Fashion from './components/Fashion';
import Navbar from './components/Navbar';
import SearchResults from './components/SearchResults';
import CheckoutPage from './components/CheckoutPage';
import Dashboard from './components/Dashboard';

function App() {

  const [cartCount, setCartCount] = useState(0);
  const [cartVisibility, setCartVisibility] = useState(false);


  const toggleCart = () => {
    setCartVisibility(!cartVisibility);
  };

  const [name, setName] = useState("");

  const [theme, setTheme] = useState();


  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
      localStorage.setItem('theme', 'dark')
    }
    else {
      setTheme('light')
      localStorage.setItem('theme', 'light')
    }
  }

  const [cartItems, setCartItems] = useState([]);



  const addToCart = (product) => {
    setCartCount((cartCount) => cartCount + 1);
    setCartItems((prevItems) => [...prevItems, product]);
  };

  const clearCart = () => {
    setCartItems([]);  // Clear the cart by resetting the cartItems state
  };


  return (
    <>
      <Router>
        <Navbar toggleCart={toggleCart} cartCount={cartCount} name={name} setName={setName} toggleTheme={toggleTheme} theme={theme} />
        <Routes>
          <Route path="/login" element={<Login setName={setName} />}></Route>
          <Route path="/signup" element={<Signup setName={setName} />}></Route>
          <Route path="/product/:id" element={<ProductPage theme={theme} />} /> {/* Route for individual product */}
          <Route path="/electronics" element={<Electronics theme={theme} />} />
          <Route path="/HomeAppliances" element={<HomeAppliances theme={theme} />} />
          <Route path="/fashion" element={<Fashion theme={theme} />} />
          <Route path="/gaming" element={<Gaming theme={theme} />} />
          <Route path="/books" element={<Books theme={theme} />} />
          <Route path="/" element={<Home toggleCart={toggleCart} setCartCount={setCartCount} cartVisibility={cartVisibility} theme={theme} addToCart={addToCart} cartItems={cartItems} setCartItems={setCartItems} />}></Route>
          <Route path="/searchResults" element={<SearchResults />} />
          <Route path="/checkoutpage" element={<CheckoutPage cartItems={cartItems} clearCart={clearCart} />} />
          <Route path="/dashboard" element={<Dashboard />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
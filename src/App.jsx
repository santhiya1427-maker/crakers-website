import { useState, useMemo, useEffect, useRef } from 'react'
import HomePage from './page/HomePage'
import CategoryPage from './page/CategoryPage'
import CheckoutPage from './page/CheckoutPage'
import SellerDashboard from './page/SellerDashboard.jsx'
import MasterDashboard from './page/MasterDashboard.jsx'
import offerImage1 from './assets/offer image1.jpg'
import offerImage2 from './assets/offer image2.jpg'
import offerImage4 from './assets/offer image4.jpg'
import burstCrackers from './assets/burst crackers.jpg'
import groundCrackers from './assets/ground crackers.jpeg'
import flowerPots from './assets/flower pots.jpeg'
import bijiliCrackers from './assets/bijili.jpeg'
import electricStone from './assets/electric stone.jpeg'
import atomBomb from './assets/atom bomb.jpeg'
import lakshmiCrackers from './assets/lakshmi.jpeg'
import deluxLakshmi from './assets/dulex lakshmi.jpeg'
import gaintChakkar from './assets/gaint chakkar.jpeg'
import peacockChakkar from './assets/peacock chakkar.jpeg'
import deluxChakkar from './assets/delux chakkar.jpeg'
import groundChakkar from './assets/big chakkar.jpeg'
import specialChakkar from './assets/special chakkar.png'
import smallPots from './assets/small pots.jpeg'
import gaintPots from './assets/gaint pots.jpeg'
import specialPots from './assets/special pots.jpeg'
import cracklingPots from './assets/crackling pots.jpeg'
import deluxePots from './assets/delux pots.jpeg'
import './App.css'
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword as signInWithEmailAndPasswordFirebase,signOut,onAuthStateChanged} from 'firebase/auth'
import app from'./firebase'

const auth = getAuth(app);
const categoriesData = [
  {
    id: 'burst',
    name: 'Burst Crackers',
    image: burstCrackers,
    products: [
      { id: 'burst-1', name: 'Red Bijili', price: 220, image: bijiliCrackers },
      { id: 'burst-2', name: 'Electric Stone', price: 150, image: electricStone  },
      { id: 'burst-3', name: 'Atom Bomb', price: 180, image: atomBomb  },
      { id: 'burst-4', name: 'Lakshmi Crackers', price:200, image: lakshmiCrackers },
      { id: 'burst-5', name: 'Deluxe Lakshmi', price:250, image: deluxLakshmi },
     ],
  },
  {
    id: 'ground',
    name: 'Ground Crackers',
    image: groundCrackers,
    products: [
      { id: 'ground-1', name: 'Giant Ground Chakkar', price: 220, image: gaintChakkar  },
      { id: 'ground-2', name: 'Peackock Chakkar', price: 150, image: peacockChakkar  },
      { id: 'ground-3', name: 'Deluxe Ground Chakkar', price: 180, image: deluxChakkar },
      { id: 'ground-4', name: 'Ground Chakkar', price: 240, image: groundChakkar  },
      { id: 'ground-5', name: 'Special Chakkar', price: 300, image: specialChakkar },
    ],
  },
  {
    id: 'flower',
    name: 'Flower Pots',
    image: flowerPots,
    products: [
      { id: 'flower-1', name: 'Small Flower Pots', price: 220, image: smallPots   },
      { id: 'flower-2', name: 'Gaint Flower Pots', price: 150, image: gaintPots  },
      { id: 'flower-3', name: 'Special Flower Pots', price: 180, image: specialPots },
      { id: 'flower-4', name: 'Crackling Flower Pots', price: 200, image: cracklingPots },
      { id: 'flower-5', name: 'Deluxe Flower Pots', price: 250, image: deluxePots },
    ],
  }
]

const specialoffers = [
  {
    title: 'big blast combo',
    image: offerImage1,
  },
  {
    title: 'colorful celebration combo',
    image: offerImage2,
  },
  {
    title: 'ultimate fireworks combo',
    image: offerImage4,
  },
]

export default function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedCategoryId, setSelectedCategoryId] = useState(null)
  const [cartItems, setCartItems] = useState([])
  const [showLoginMenu, setShowLoginMenu] = useState(false)
  const [loginType, setLoginType] = useState('')
  const [userName, setUserName] = useState('')
  const [number, setNumber] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [registrationSuccess, setRegistrationSuccess] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [storedEmail, setStoredEmail] = useState('')
  const [storedPassword, setStoredPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [authMode, setAuthMode] = useState('register')
  const [locationEnabled, setLocationEnabled] = useState(false)
  const [locationCoords, setLocationCoords] = useState(null)
  const locationWatcher = useRef(null)
  const [message, setMessage] = useState('')
  const [lastorder, setLastOrder] = useState(null)
  const [homesearchquery, setHomeSearchQuery] = useState('')
  const [productsearchquery, setProductSearchQuery] = useState('')
  const [showLoginBox, setShowLoginBox] = useState(false)
  const [showoderbox, setShowOrderBox] = useState(false)
  const [redirectPage,  setRedirectPage] = useState('home')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentPage])

  const selectCategory = useMemo(() => {
    if (!categoriesData || !selectedCategoryId) return null;
    return categoriesData.find(category => category && category.id === selectedCategoryId);
  }, [categoriesData, selectedCategoryId]);

  const filteredCategories = useMemo(() => {
    const query = (homesearchquery || '').toString().trim().toLowerCase();
    if (!categoriesData) return [];
    if (!query) return categoriesData;

    return categoriesData.filter(category => {
      if (!category) return false;
      const name = (category.name || '').toString().toLowerCase();
      const description = (category.description || '').toString().toLowerCase();
      return name.includes(query) || description.includes(query);
    });
  }, [homesearchquery, categoriesData]);

  const filteredProducts = useMemo(() => {
    const query = (productsearchquery || '').toString().trim().toLowerCase();
    
    if (!selectCategory || !selectCategory.products) {
      return selectCategory && selectCategory.products ? selectCategory.products : [];
    }
    if (!query) return selectCategory.products;

    return selectCategory.products.filter(product => {
      if (!product) return false;
      const name = (product.name || '').toString().toLowerCase();
      return name.includes(query);
    });
  }, [productsearchquery, selectCategory]);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocationEnabled(true)
          setLocationCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude })
        },
        () => setLocationEnabled(false),
        { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 },
      )
    }
  }, [])

  useEffect(() => {
    return () => {
      if (locationWatcher.current != null && 'geolocation' in navigator) {
        navigator.geolocation.clearWatch(locationWatcher.current)
        locationWatcher.current = null
      }
    }
  }, [])
  useEffect(() => {
    if (!message) return
    const id = setTimeout(() => setMessage(''), 4000)
    return () => clearTimeout(id)
  }, [message])

  const requestLocation = () => {
    if (!('geolocation' in navigator)) {
      setMessage('Geolocation is not supported by your browser.')
      setLocationEnabled(false)
      return
    }
    setMessage('Detecting location...')
    if (locationWatcher.current != null) {
      navigator.geolocation.clearWatch(locationWatcher.current)
      locationWatcher.current = null
    }

    const id = navigator.geolocation.watchPosition(
      (pos) => {
        setLocationEnabled(true)
        setLocationCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude })
        setMessage('Location detected')
      },
      (err) => {
        setLocationEnabled(false)
        if (err && err.code === err.PERMISSION_DENIED) {
          setMessage('Location permission denied.')
        } else {
          setMessage('Unable to retrieve location.')
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0, distanceFilter: 1 },
    )

    locationWatcher.current = id
  }

  const handleAddToCart = (product) => {
    setCartItems((items) => {
      const existing = items.find((item) => item.id === product.id)
      if (existing) {
        return items.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }
      return [...items, { ...product, quantity: 1 }]
    })
    setMessage(`Added ${product.name} to your order`)
    setShowOrderBox(false)
    setShowLoginBox(false)
  }

  const handleCategorySelect = (categoryId) => {
    setSelectedCategoryId(categoryId)
    setProductSearchQuery('')
    setCurrentPage('category')
    setMessage('')
  }

  const toggleLoginBox = () => {
    setShowLoginBox((open) => {
      const next = !open
      if (next) setAuthMode('register')
      return next
    })
    setShowOrderBox(false)
    setMessage('')
  }

  const toggleOrderBox = () => {
    setShowOrderBox((open) => !open)
    setShowLoginBox(false)
    setMessage('')
  }

  const handleCheckout = () => {
    if (!loggedIn) {
      setRedirectPage('customer')
      setLoginType('customer')
      setAuthMode('login')
      setShowLoginBox(true)
      setShowOrderBox(false)
      setMessage('Customer Login is required to checkout. Please login first.')
      return
    }
    if (!locationEnabled) {
      setShowOrderBox(true)
      setShowLoginBox(false)
      setMessage('Please enable location permission before checkout.')
      return
    }
    if (cartCount === 0) {
      setMessage('Add at least one item before checkout')
      return
    }
    setLastOrder(cartItems)
    setCartItems([])
    setShowOrderBox(false)
    setShowLoginBox(false)
    setCurrentPage('orderPlaced')
    setMessage('')
  }

  const handleLogin = async (event) => {
    event.preventDefault(); 

    if (!email.trim() || !password.trim()) {
      setMessage('Enter your email and password to login');
      return;
    }
    try {
      setMessage('logging in....');
    const userCredential = await signInWithEmailAndPasswordFirebase(auth, email, password);
    const user = userCredential.user;
    const assignedRole = localStorage.getItem(`role_${user.email}`) || 'customer';
    const assignedName = localStorage.getItem(`name_${user.email}`) || user.email.split('@')[0];

    if (assignedRole !== loginType) {
      setMessage(`This account is registered as a ${assignedRole}, not a ${loginType}.`);
      await signOut(auth); 
      return;
    }

    localStorage.setItem('username', assignedName);
    setLoggedIn(true);
    setShowLoginBox(false);
    setMessage('');
    if (loginType === 'seller') {
      const storedEmail = localStorage.getItem('registered_seller_email');
      const storedPassword = localStorage.getItem('registered_seller_password');

      if (!storedEmail) {
        setMessage('Seller email is not registered. Please Register first!');
        setAuthMode('register'); 
        return;
      }

      if (email === storedEmail && password === storedPassword) {
        const registeredName = localStorage.getItem('registered_seller_name');
        localStorage.setItem('username', (registeredName && registeredName !== 'null') ? registeredName : 'Seller User');
        
        setLoggedIn(true);
        setShowLoginBox(false);
        setCurrentPage('seller-dashboard');
        setMessage('');
      } else {
        setMessage('Incorrect Email OR Password please try again');
      }
    }
    else if (loginType === 'master') {
      const storedEmail = localStorage.getItem('registered_master_email');
      const storedPassword = localStorage.getItem('registered_master_password');

      if (!storedEmail) {
        setMessage('Master email is not registered. Please Register first!');
        setAuthMode('register');
        return;
      }

      if (email === storedEmail && password === storedPassword) {
        const registeredName = localStorage.getItem('registered_master_name');
        localStorage.setItem('username', (registeredName && registeredName !== 'null') ? registeredName : 'Master User');

        setLoggedIn(true);
        setShowLoginBox(false);
        setCurrentPage('master-dashboard'); 
        setMessage('');
      } else {
        setMessage('Incorrect Email OR Password please try again');
      }
    }

    
    else if (loginType === 'customer') {
      const storedEmail = localStorage.getItem('registered_customer_email');
      const storedPassword = localStorage.getItem('registered_customer_password');

      if (!storedEmail) {
        setMessage('Customer email is not registered. Please Register first!');
        setAuthMode('register');
        return;
      }

      if (email === storedEmail && password === storedPassword) {
        const registeredName = localStorage.getItem('registered_customer_name');
        localStorage.setItem('username', (registeredName && registeredName !== 'null') ? registeredName : 'Customer User');

        setLoggedIn(true);
        setShowLoginBox(false);
     if (redirectPage === 'checkout') {
    if (!locationEnabled) {
      setCurrentPage('checkout');
      setShowOrderBox(true);
      setMessage('Please enable location permission before checkout.');
    } else if (cartItems.length === 0) {
      setCurrentPage('home');
      setMessage('Add at least one item before checkout');
    } else {
      setLastOrder(cartItems);
      setCartItems([]);
      setCurrentPage('orderPlaced');
      setMessage('Logged in & Order Placed Successfully!');
    }
  } else {
    setCurrentPage('home');
  }
}
} 
    }
catch (error) {
    console.error(error);
    if (error.code === 'auth/invalid-credential') {
      setMessage('Incorrect Email OR Password please try again');
    } else {
      setMessage(error.message);
    }
  }
}
  const handleRegister = (event) => {
    event.preventDefault();
    const safeUserName = (typeof userName !== 'undefined' ? userName : (typeof username !== 'undefined' ? username : ''));

    console.log("Register Button Clicked Successfully!", { safeUserName, email, password, number });
    if (!number || number.length !== 10) {
      setMessage('Enter a valid 10-digit mobile number');
      return;
    }
    if (!email || !email.trim()) {
      setMessage('Enter your email to register');
      return;
    }
    if (!password) {
      setMessage('Enter a password');
      return;
    }

    const currentRegisterName = safeUserName ? safeUserName.trim() : '';
    if (loginType === 'seller') {
      localStorage.setItem('registered_seller_email', email);
      localStorage.setItem('registered_seller_password', password);
      localStorage.setItem('registered_seller_name', currentRegisterName || 'Seller');
    }
    else if (loginType === 'master') {
      localStorage.setItem('registered_master_email', email);
      localStorage.setItem('registered_master_password', password);
      localStorage.setItem('registered_master_name', currentRegisterName || 'Master');
    }
    else if (loginType === 'customer') {
      localStorage.setItem('registered_customer_email', email);
      localStorage.setItem('registered_customer_password', password);
      localStorage.setItem('registered_customer_name', currentRegisterName || 'Customer');
    }
    if (typeof setUserName === 'function') setUserName('');
    if (typeof setUserName === 'function') setUserName('');
    if (typeof setEmail === 'function') setEmail('');
    if (typeof setPassword === 'function') setPassword('');
    if (typeof setNumber === 'function') setNumber('');

    setAuthMode('login'); 
    setShowLoginBox(true); 
    setMessage('Registered successfully! Please Login.');
  };
  const handleLogout =() =>{
    localStorage.removeItem('username');
    setLoggedIn(false);
    setCurrentPage('home');
    setShowLoginBox(false);
  }

  const handleRemoveItem = (productId) => {
    setCartItems((items) => items.filter((item) => item.id !== productId))
  }

  return (
    <div className="app-shell">
      {(currentPage !== 'seller-dashboard' && currentPage !== 'master-dashboard') && (
      <section className={`search-row ${currentPage === 'home' ? 'home-page-search' : ''} ${currentPage === 'category' ? 'category-page-search' : ''} ${currentPage === 'checkout' ? 'checkout-page-search' : ''}`}>
        <div className="search-box">
          <div className="search-input-wrapper">
            <button
              type="button"
              className="search-left"
              aria-label={locationEnabled ? 'Location enabled' : 'Enable location'}
              onClick={requestLocation}
            >
              📍
            </button>
            <input
              type="search"
              placeholder="Search crackers, categories, festival ideas"
              value={homesearchquery}
              onChange={(event) => {
                setHomeSearchQuery(event.target.value)
                setCurrentPage('home')
              }}
            />
            <div className="search-right">
            <div className="login-menu-wrapper">
              <button
                type="button"
                className="icon-button"
                aria-label="Login"
                onClick={() => setShowLoginMenu(!showLoginMenu)}>
                <span className="icon">👤</span>
                </button>
                {showLoginMenu && (
                  <div className="login-menu">
                    <div
                      className="login-item"
                      onClick={() => {
                        setShowLoginMenu(false)
                        setLoginType('seller')
                        setAuthMode('login')
                        setShowLoginBox(true)
                        }}
                        >
                        👨‍💼Seller Login
                    </div>
                     <div
                      className="login-item"
                      onClick={() => {
                        setShowLoginMenu(false)
                        setRedirectPage('home')
                        setLoginType('customer')
                        setAuthMode('login')
                        setShowLoginBox(true)
                        }}
                        >
                        🛒Customer Login
                    </div>
                     <div
                      className="login-item"
                      onClick={() => {
                        setShowLoginMenu(false)
                        setLoginType('master')
                        setAuthMode('login')
                        setShowLoginBox(true)
                        }}
                        >
                        👑Master Login
                    </div>
                    </div>)}
                    </div>
              <button
                type="button"
                className="icon-button order-button"
                aria-label="Order"
                onClick={() => {
                  if (cartCount > 0) {
                    setCurrentPage('checkout')
                  } else {
                    toggleOrderBox()
                  }
                }}
              >
                <span className="icon">🛒</span>
                {cartCount > 0 && (
                  <span
                    className="cart-badge"
                    onClick={(e) => {
                      e.stopPropagation()
                      setCurrentPage('checkout')
                    }}
                    role="button"
                    aria-label={`Open checkout (${cartCount})`}
                  >
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
        {showLoginBox && (
          <>
          <div className="login-overlay"></div>
          <section className="search-panel login-panel">
            <div className="panel-header">
              <div>

                <p className="eyebrow">{authMode === 'register' ? 'Register' : 'Login'}</p>
                <h3>
                  {loginType === 'seller' && 'Seller login'}
                  {loginType === 'customer' && 'Customer login'}
                  {loginType === 'master' && 'Master login'}
                </h3>
              </div>
              <button type="button" className="close-button" onClick={() => setShowLoginBox(false)}>
                ✕
              </button>
            </div>
            
            {authMode === 'register' ? (
              <>
                <form className="panel-form" onSubmit={handleRegister}>
                  <label>
                    <input
                      type="text"
                      placeholder="Enter your user name"
                      value={userName}
                      onChange={(event) => setUserName(event.target.value)}
                    />
                  </label>
                  <label>
                    <div>
                      <span>+91</span>
                    <input
                      type="tel"
                      placeholder="Enter your number"
                      value={number}
                      onChange={(event) => {
                        const value = event.target.value;
                        if(value.length <= 10){
                          setNumber(value);
                        }
                        else{setPhoneError('Invalid phone number');
                        }
                        }}
                      />
                    </div>
                    </label>         
                  
                  <label>
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </label>

                  <label>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                    />
                  </label>

                  <label>
                    <input
                      type="password"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(event) => setConfirmPassword(event.target.value)}
                    />
                  </label>

                  <button type="submit" className="primary-button full-width">
                    Register
                  </button>
                </form>

                <p>
                  Already have an account?{' '}
                  <a
                    href="#login"
                    onClick={(e) => {
                      e.preventDefault()
                      setAuthMode('login')
                    }}
                  >
                    Login
                  </a>
                </p>
              </>
            ) : (
              <>
                <form className="panel-form" onSubmit={handleLogin}>
                  <label>
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </label>

                  <label>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                    />
                  </label>

                  <button type="submit" className="primary-button full-width">
                    Login
                  </button>
                </form>

                <p>
                  Don't have an account?{' '}
                  <a
                    href="#register"
                    onClick={(e) => {
                      e.preventDefault()
                      setAuthMode('register')
                    }}
                  >
                    Register
                  </a>
                </p>
              </>
            )}
          </section>
          </>
        )}
        </section>
      )}
      <main className="main-content" style={{ padding: '20px 0' }}>
        {currentPage === 'seller-dashboard' && <SellerDashboard onbacktoHomePage={handleLogout}/>}
        {currentPage === 'master-dashboard' && <MasterDashboard onbacktoHomePage={handleLogout}/>}
        {currentPage === 'home' && (
          <HomePage 
            categories={filteredCategories} 
            onCategorySelect={handleCategorySelect} 
            specialOffers={specialoffers}
          />
        )}

        {currentPage === 'category' && selectCategory && (
          <CategoryPage 
            category={selectCategory} 
            products={filteredProducts} 
            onAddToCart={handleAddToCart}
            onBack={() => setCurrentPage('home')}
          />
        )}

        {currentPage === 'checkout' && (
          <CheckoutPage 
            cartItems={cartItems} 
            cartCount={cartCount}
            cartTotal={cartTotal} 
            onRemoveItem={handleRemoveItem}
            handleCheckout={handleCheckout}
            onBackToProduct={() => setCurrentPage('category')}
            message={message}
          />
        )}
        
        {currentPage === 'orderPlaced' && (
          <div className="order-success" style={{ textAlign: 'center', padding: '40px' }}>
            <h2>🎉 Order Placed Successfully!</h2>
            <p>Thank you for shopping with us!</p>
            <button className="primary-button" onClick={() => setCurrentPage('home')} style={{ marginTop: '20px' }}>
              Continue Shopping
            </button>
          </div>
        )}
      </main>
      {showoderbox && (
        <section className="search-panel order-panel fixed-order-panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Order</p>
              <h3>Your current order</h3>
            </div>
            <button type="button" className="close-button" onClick={() => setShowOrderBox(false)}>×</button>
          </div>
          <div className="panel-body" style={{ padding: '20px' }}>
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <div>
                {cartItems.map(item => (
                  <div
                    key={item.id}
                    className="order-item-entry"
                    onClick={() => {
                      setShowOrderBox(false)
                      setCurrentPage('checkout')
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <strong style={{ fontSize: '14px' }}>{item.name}</strong>
                      <small style={{ color: '#888', marginTop: '4px' }}>Sparow Mart</small>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span className="item-count-badge">x{item.quantity}</span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  </div>
                ))}
                <hr />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', marginTop: '10px' }}>
                  <span>Total:</span>
                  <span>₹{cartTotal}</span>
                </div>
                <button 
                  className="primary-button full-width" 
                  style={{ marginTop: '20px' }}
                  onClick={() => {
                    setShowOrderBox(false);
                    setCurrentPage('checkout');
                  }}
                >
                  Go to Checkout
                </button>
              </div>
            )}
          </div>
        </section>
      )}
      {currentPage === 'category' && cartCount > 0 && (
        <div
          className="floating-seller-box"
          role="button"
          onClick={() => {
            setShowOrderBox(false)
            setCurrentPage('checkout')
          }}
        >
          <div className="seller-name">Sparow Mart</div>
          <div className="seller-count">{cartCount}</div>
        </div>
      )}
      {message && (
        <div className="global-message-toast" role="status" onClick={() => setMessage('')}>
          {message}
        </div>
      )}
    </div>
  )
}
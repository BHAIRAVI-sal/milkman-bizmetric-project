import Login from './pages/Login'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

import AuthSelect from './pages/AuthSelect.jsx'
import Signup from './pages/Signup.jsx'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import CartBody from './pages/CartBody.jsx'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess.jsx'
import Dashboard from './pages/Dashboard'
import DeliveryPanel from './pages/DeliveryPanel'
import NotFound from './pages/NotFound'
import AdminLogin from './pages/AdminLogin.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { CartProvider } from './store/cart.jsx'

const router = createBrowserRouter([
  { path: '/', element: <AuthSelect /> },
  { path: '/products', element: <Products /> },
  { path: '/products/:id', element: <ProductDetails /> },
  { path: '/cart', element: <CartBody /> },
  { path: '/checkout', element: <Checkout /> },
  { path: '/order-success', element: <OrderSuccess /> },
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/delivery', element: <DeliveryPanel /> },
  { path: '*', element: <NotFound /> },
  { path: '/signup', element: <Signup /> },
  { path: '/login', element: <Login /> },
  { path: '/admin-login', element: <AdminLogin /> },
  { path: '/admin', element: <ProtectedRoute allowRole="admin"><AdminDashboard /></ProtectedRoute> },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </React.StrictMode>
)
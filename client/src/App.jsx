import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Register from './components/Register'
import Login from './components/Login'
import Addproduct from './components/Addproduct'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import Cart from './components/Cart'


export default function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path="/add-product" element={
          <ProtectedRoute>
            <Addproduct/>
          </ProtectedRoute>
        }/>
        <Route path="/cart" element={
          <ProtectedRoute>
            <Cart/>
          </ProtectedRoute>
        }/>

      </Routes>
    </BrowserRouter>
  )
}
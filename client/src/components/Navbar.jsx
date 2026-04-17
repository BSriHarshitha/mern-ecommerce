import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()

  const token = localStorage.getItem("token")
  const role = localStorage.getItem("role")

  function handleLogout() {
    alert("Logged out successfully")
    localStorage.removeItem("token")
    localStorage.removeItem("role") 
    navigate("/login")
  }

  return (
    <nav className='navbar navbar-dark bg-dark px-3'>
      <Link className='navbar-brand' to="/">Home</Link>

      {
        token ? (
          <>
            {role === "admin" && (
              <Link className='nav-item text-white me-3' to="/add-product">
                Add Product
              </Link>
            )}
            {role === "user" && (
              <Link className='nav-item text-white me-3' to="/cart">
                Cart
              </Link>
            )}
            <button className='btn btn-danger' onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className='nav-item text-white me-3' to="/login">
              Login
            </Link>
            <Link className='nav-item text-white' to="/register">
              Register
            </Link>
          </>
        )
      }
    </nav>
  )
}
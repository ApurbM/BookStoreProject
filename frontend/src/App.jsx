import React from 'react'
import { Outlet } from 'react-router'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <>
        <Navbar/>
        <Outlet/>    
        <Footer/>
        <ToastContainer
        position="top-center"   // You can change this
        autoClose={3000}       // Duration in ms
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"          // or "dark"
      />
    </>
  )
}

export default App
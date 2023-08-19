import React from 'react'
import CustomNavbar from '@/components/CustomNavbar'
function noExisteUsuario404() {
  return (
    <>
    <CustomNavbar></CustomNavbar>
    <div className='min-vh-100 bg-dark text-white d-flex justify-content-center containter-fluid py-4'>
      <h1 className='font-bebas'>El Usuario no existe</h1>
    </div>
    </>
  )
}

export default noExisteUsuario404
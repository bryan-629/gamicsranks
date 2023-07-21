import React, { useEffect } from 'react'
import Image from 'next/image'
import logo from '../../public/logo.svg'
import LoginButton from './LoginButton'
import LogOut from './LogOut'
import { useAuthentication } from '../../Context/AuthProvider'
import Link from 'next/link'
function Navbar() {
  const { user,showIdModal, isLoadingLoginUser, signInWithGoogle, signOutUser, getUser,setShowIdModal} = useAuthentication();
 
  
  return(
        <nav className="navbar navbar-expand-lg bg-dark shadow " data-bs-theme="dark">
          <div className="container-fluid d-flex justify-content-between">
            <div>
              <a className="navbar-brand" href="#"><Image src={logo} width={127} height={29} alt='logo'></Image></a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
            <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarColor01">
              <ul className="navbar-nav">
                <li className="nav-item px-4">
                  <Link className="nav-link active font-roboto" href="/">Home  
                  </Link>
                </li>
                
                  {user && user != null?(
                    <>
                      <li className="nav-item px-4">
                      <Link className="nav-link active font-roboto" href={`/${user.id}`}>My profile</Link>
                    </li>
                    <li >
                      <LogOut clases={'btn text-white font-roboto'}>Sign out</LogOut>
                    </li>
                  </>
                  ):(
                  <LoginButton clases={'btn btn-primary font-roboto'}>Sign in</LoginButton>)}
                  
              </ul>
            </div>
          </div>
        </nav>

  )
}

export default Navbar
import React, { useEffect } from 'react'
import Image from 'next/image'
import logo from '../../public/logo.svg'
import LoginButton from './LoginButton'
import LogOut from './LogOut'
import { useAuthentication } from '../../Context/AuthProvider'
import Link from 'next/link'
import { Navbar, Nav } from 'react-bootstrap';

const CustomNavbar = () => {
  const { user ,showNewIdModal, isLoadingAuth, signInWithGoogle, signOutUser, setShowNewIdModal,changeId} = useAuthentication();

  return (
    <Navbar bg="dark" className='shadow' variant="dark" expand="lg">
      <div className='container-fluid'>
      <Navbar.Brand href="/"><Image src={logo} width={127} height={29} alt='logo'></Image></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link className='font-roboto px-4 text-center active' href="/">Home</Nav.Link>
          {!isLoadingAuth && user != null?(
                    <>
          
                      <Nav.Link className="nav-link active font-roboto text-center px-4" href={`/${user.id}`}>My profile</Nav.Link>
                    
                      <LogOut clases={'btn text-white font-roboto px-4 text-center'}>Sign out</LogOut>
                    
                  </>
                  ):(
                  <LoginButton clases={'btn btn-primary font-roboto'} >Sign in</LoginButton>)}
        </Nav>
      </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default CustomNavbar;

import React, { useEffect } from 'react'
import Image from 'next/image'
import logo from '../../public/logo.svg'
import LoginButton from './LoginButton'
import LogOut from './LogOut'
import { useAuthentication } from '../../Context/AuthProvider'
import Link from 'next/link'
import { Navbar, Nav } from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';

const CustomNavbar = () => {
  const { user ,showNewIdModal, isLoadingAuth, signInWithGoogle, signOutUser, setShowNewIdModal,changeId} = useAuthentication();

    const userImg = (
      <Image
        src={user?.photo_url}
        alt="UserName profile image"
        className=' align-content-center rounded-circle  p-0 flex-row'
        width={30}
        height={30}
        roundedCircle = {true}
    />
    )
 
  
  return (
    <Navbar bg="dark" className='shadow' variant="dark" expand="lg">
      <div className='container-fluid mx-2'>
      <Navbar.Brand href="/"><Image src={logo} width={127} height={29} alt='logo'></Image></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link className='font-roboto px-4 text-center active mt-1' href="/">Home</Nav.Link>
          {!isLoadingAuth && user != null?(
                    <>
                       <NavDropdown
                          className='active font-roboto mx-2 mx-auto d-flex justify-content-center flex-column align-items-center'
                          id="nav-dropdown-dark-example"
                          title={userImg}
                          
                          menuVariant="dark"
                          align={ {md: "end",sm:"start"} } 
                        >
                          
                          <NavDropdown.Item className='nav-link font-roboto text-center text-white px-4' href={`/${user.id}`} >Profile</NavDropdown.Item>
                          
                          <NavDropdown.Item>
                            <LogOut clases={'btn text-white w-100  font-roboto text-center'}>Sign out</LogOut>
                          </NavDropdown.Item>
                        </NavDropdown>
                    
                  </>
                  ):(
                  <div className='d-flex align-items-center'>
                    <LoginButton clases={'btn btn-primary py-1 font-roboto'} >Sign in</LoginButton>
                  </div>
                  )}
        </Nav>
      </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default CustomNavbar;

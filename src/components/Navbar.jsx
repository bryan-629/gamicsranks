import React from 'react'
import Image from 'next/image'
import logo from '../../public/logo.svg'
import Link from 'next/link'
import { getAuth, signInWithPopup, GoogleAuthProvider} from "firebase/auth";
function Navbar() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const singIn = async () => {
      const result = await signInWithPopup(auth,provider)
      console.log(result.user)
      //<button classNameName='btn btn-primary' onClick={singIn}>Sign In With Gmail</button>
  }
  return (
        <nav className="navbar navbar-expand-lg bg-dark shadow " data-bs-theme="dark">
          <div className="container-fluid d-flex justify-content-between">
            <div>
              <a className="navbar-brand" href="#"><Image src={logo} width={127} height={29}></Image></a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
            <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarColor01">
              <ul className="navbar-nav">
                <li className="nav-item px-4">
                  <a className="nav-link active" href="#">Home
                    <span className="visually-hidden">(current)</span>
                  </a>
                </li>
                <li >
                  <button className='btn btn-primary' onClick={singIn}>Sign In With Gmail</button>
                </li>
              </ul>
            </div>
          </div>
        </nav>

  )
}

export default Navbar
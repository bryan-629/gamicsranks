import React from 'react'
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from 'next/router';
function LogOut({children,clases}) {
    const auth = getAuth();
    const router = useRouter()
    const handleSignOut = () =>{
        signOut(auth).then(() => {
            // Sign-out successful.
            router.push("/")
          }).catch((error) => {
            // An error happened.
          });
    }

  return (
    <button className={`${clases}`} onClick={handleSignOut}>{children}</button>
  )
}

export default LogOut
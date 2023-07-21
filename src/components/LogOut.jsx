import React from 'react'
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from 'next/router';
import { useAuthentication } from '../../Context/AuthProvider';
function LogOut({children,clases}) {
    const { user, isLoadingLoginUser, signInWithGoogle, signOutUser,getUser } = useAuthentication();
  return (
    <button className={`${clases}`} onClick={signOutUser}>{children}</button>
  )
}

export default LogOut
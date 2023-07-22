import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
import { useAuthentication } from '../../Context/AuthProvider';

function LoginButton({children, clases}) {
    
    const {  user, showNewIdModal, isLoadingAuth, signInWithGoogle, signOutUser, setShowNewIdModal, changeId, setIsLoadingAuth } = useAuthentication();
    const singIn = async () => {
      setIsLoadingAuth(true)
      await signInWithGoogle();
    }
  return (
    <button className={`${clases}`} disabled={isLoadingAuth} onClick={singIn}>{children}</button>
  )
}

export default LoginButton
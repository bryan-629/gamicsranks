import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
import { useAuthentication } from '../../Context/AuthProvider';

function LoginButton({children, clases}) {
    
    const { user, loading, signInWithGoogle, signOutUser,getUser } = useAuthentication();
    const singIn = async () => {
        await signInWithGoogle();
    }
  return (
    <button className={`${clases}`} onClick={singIn}>{children}</button>
  )
}

export default LoginButton
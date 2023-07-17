import React from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { useRouter } from 'next/router';
function LoginButton({children, clases}) {
    const router = useRouter()
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const singIn = async () => {
        await signInWithPopup(auth,provider).then((result)=>{
         router.push(`/${result.user.displayName}`)
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
        });
    }
  return (
    <button className={`${clases}`} onClick={singIn}>{children}</button>
  )
}

export default LoginButton
// useAuthentication.js
import { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import useApi from '@/hooks/useApi';
const AuthContext = createContext();

export const useAuthentication = () => {
  return useContext(AuthContext);
};

const useAuthenticationHook = () => {
  const auth = getAuth();
  const { data, isLoading, error, fetchData } = useApi();
  const [user, setUser] = useState(null);
  const [showIdModal, setShowIdModal] = useState(false);
  const [isLoadingLoginUser, setIsLoadingLoginUser] = useState(false);
  const router = useRouter()

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = async () => {
    setIsLoadingLoginUser(true)
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const form ={
        "displayname" : user.displayName,
        "email": user.email,
        "token": user.getIdToken(),
        "emailVerified": user.emailVerified,
        "uid" : user.uid
      }
      await fetchData(process.env.NEXT_PUBLIC_API_URL +"login.php", "POST", form).then((response)=>{
        
        if (response[0].id == "") {
          setShowIdModal(true)
          return
        }
        setUser(response[0])
        router.push("/" + response[0].id)

      });
      
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error.message);
    }
    setIsLoadingLoginUser(false)
  };

  const getUser = () =>{
    return user
}

  const signOutUser = async () => {
    try {
      await signOut(auth);
      setUser(null);
      router.push("/")
    } catch (error) {
      console.error('Error al cerrar sesión:', error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged( async (user) => {
      if (user) {
        const form ={
          "displayname" : user.displayName,
          "email": user.email,
          "token": user.getIdToken(),
          "emailVerified": user.emailVerified,
          "uid" : user.uid
        }
        await fetchData(process.env.NEXT_PUBLIC_API_URL +"login.php", "POST", form).then((response)=>{
          setUser(response[0])
         if (response[0].id == "") {
           setShowIdModal(true)
           return
         }
       });
      }
     
      
      setIsLoadingLoginUser(false);
    });
    return () => unsubscribe();
  }, []);

  return { user,showIdModal, isLoadingLoginUser, signInWithGoogle, signOutUser, getUser,setShowIdModal };
};

export const AuthProvider = ({ children }) => {
  const auth = useAuthenticationHook();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

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
  const { data: dataSaveNewID, isLoading: isLoadingSaveNewID, error:  saveNewIDError, fetchData:saveNewID } = useApi();
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
        "token": user.stsTokenManager.accessToken,
        "photo_url": user.photoURL,
        "emailVerified": user.emailVerified,
        "uid" : user.uid
      }
      await fetchData(process.env.NEXT_PUBLIC_API_URL +"login.php", "POST", form).then((response)=>{
        setUser(response[0])
        if (response[0].id == "") {
          setShowIdModal(true)
          router.push("/" + response[0].id )
        }
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
  const changeId = async (newId) =>{
    const sendData = {
        "id":encodeURI(newId.toUpperCase()),
        "uid":user.uid
    }
    await saveNewID(process.env.NEXT_PUBLIC_API_URL +"saveNewId.php", "POST", sendData).then((response)=>{
        
        setUser({...user,"id": newId.toUpperCase()})
        console.log(user)
        
    })
    
}


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged( async (userChanged) => {
     
          const form ={
            "displayname" :userChanged.displayName,
            "email": userChanged.email,
            "token": userChanged.stsTokenManager.accessToken,
            "photo_url":userChanged.photoURL,
            "emailVerified": userChanged.emailVerified,
            "uid" : userChanged.uid
          }
      
          /*await fetchData(process.env.NEXT_PUBLIC_API_URL +"login.php", "POST", form).then((response) =>{
            setUser(response[0])
            if (response[0].id == "") {
              setShowIdModal(true)
            }       
          })*/
          
      setIsLoadingLoginUser(false);
    });
    return () => unsubscribe();
  }, []);

  return { user,showIdModal, isLoadingLoginUser, signInWithGoogle, signOutUser, getUser,setShowIdModal,changeId };
};

export const AuthProvider = ({ children }) => {
  const auth = useAuthenticationHook();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

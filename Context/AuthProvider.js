// useAuthentication.js
import { db,app } from '@/firebase';
import { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, signInWithRedirect, signOut, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import useApi from '@/hooks/useApi';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export const useAuthentication = () => {
  return useContext(AuthContext);
};

const useAuthenticationHook = () => {
  const route = useRouter()
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState();
  const googleProvider = new GoogleAuthProvider();
  const { data: dataSaveNewID, isLoading: isLoadingSaveNewID, error: saveNewIDError, fetchData: saveNewID } = useApi();
  const { data, isLoading, error, fetchData } = useApi();
  const [showNewIdModal, setShowNewIdModal] = useState(false);
  const [isLoadingLoginUser, setIsLoadingLoginUser] = useState(true);


  useEffect(() => {
    if (user != null && isLoadingAuth) {
      setIsLoadingAuth(false)
    }
  }, [user]);

  

  const signInWithGoogle = async () => {
    setIsLoadingAuth(true);
    try {
      await signInWithRedirect(auth, googleProvider);
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error.message);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      setUser(null);
      route.push("/")
    } catch (error) {
      console.error('Error al cerrar sesión:', error.message);
    }
  };

  const callLoginphp = async (userChanged) => {
    setIsLoadingAuth(true);
    const form = {
      "displayname": userChanged.displayName,
      "email": userChanged.email,
      "token": userChanged.stsTokenManager.accessToken,
      "photo_url": userChanged.photoURL,
      "emailVerified": userChanged.emailVerified,
      "uid": userChanged.uid
    };

    try {
      const response = await fetchData(process.env.NEXT_PUBLIC_API_URL + 'login.php', 'POST', form);
      console.log(response);
      if (response != undefined && response != null) {
        if (response[0].id === "") {
          setShowNewIdModal(true);
        }
        setUser(response[0]);
      }
    } catch (error) {
      console.error('Error al llamar a login.php:', error.message);
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const changeId = async (newId) => {
    setIsLoadingAuth(true);
    const sendData = {
      "id": encodeURI(newId.toUpperCase()),
      "uid": user.uid
    };
    try {
      const response = await saveNewID(process.env.NEXT_PUBLIC_API_URL + "saveNewId.php", "POST", sendData);
      setUser({ ...user, "id": newId.toUpperCase() });
      setShowNewIdModal()
    } catch (error) {
      console.error('Error al cambiar el ID:', error.message);
    } finally {
      setIsLoadingAuth(false)
    }
  };

  useEffect(() => {
    setIsLoadingAuth(true)
    const unsubscribe = onAuthStateChanged(auth, (userChanged) => {
      setIsLoadingAuth(false)
      if (userChanged != null) {
        callLoginphp(userChanged);
      }
    });
    
    return () => {
      unsubscribe();
      
    }
  }, []);

  return { user, showNewIdModal, isLoadingAuth, signInWithGoogle, signOutUser, setShowNewIdModal, changeId, setIsLoadingAuth };
};

export const AuthProvider = ({ children }) => {
  const auth = useAuthenticationHook();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

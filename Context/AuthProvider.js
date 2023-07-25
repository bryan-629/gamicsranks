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
  const [authError, setAuthError] = useState(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState();
  const googleProvider = new GoogleAuthProvider();
  const { data: dataSaveNewID, isLoading: isLoadingSaveNewID, error: saveNewIDError, fetchData: saveNewID } = useApi();
  const { data, isLoading, error, fetchData } = useApi();
  const [showNewIdModal, setShowNewIdModal] = useState(false);
  const [isLoadingLoginUser, setIsLoadingLoginUser] = useState(true);
  const [userFromGoogle, setUserFromGoogle] = useState(null);


  useEffect(() => {
    if (user != null && isLoadingAuth) {
      setIsLoadingAuth(false)
    }
  }, [user]);

  useEffect(() => {
    if (userFromGoogle != null) {
      callLoginphp(userFromGoogle)
    }
  }, [userFromGoogle]);
  

  useEffect(() => {
    if (saveNewIDError) {
      setAuthError(saveNewIDError)
      signOutUser()
    }
    if (error) {
      setAuthError(error)
      signOutUser()
    }
  }, [saveNewIDError,error]);

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
    if (user == null) {
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
  
        if (response != undefined && response != null) {
          setUser(response[0]);
          if (response[0].id === "") {
            setShowNewIdModal(true);
          }
          
        }
      } catch (error) {
        setAuthError()
        console.error('Error al llamar a login.php:', error.message);
      } finally {
        setIsLoadingAuth(false);
      }
    }
    
    
  };

  const changeId = async (newId) => { //Funcion que cambia el id del usuario en el backend 
    setIsLoadingAuth(true);
    const sendData = {
      "id": encodeURI(newId.toUpperCase()),
      "uid": user.uid
    };
      await saveNewID(process.env.NEXT_PUBLIC_API_URL + "saveNewId.php", "POST", sendData).then(()=>{
      });
      setUser({ ...user, "id": newId.toUpperCase() });
      setShowNewIdModal()
      setIsLoadingAuth(false)

  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userChanged) => {
      setIsLoadingAuth(true)
      setUserFromGoogle(userChanged)
      setIsLoadingAuth(false)
    });
    return () => {
      unsubscribe();
    };
  }, []); 
  

  return { user, showNewIdModal, isLoadingAuth, authError, signInWithGoogle, signOutUser, setShowNewIdModal, changeId, setIsLoadingAuth };
};

export const AuthProvider = ({ children }) => {
  const auth = useAuthenticationHook();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

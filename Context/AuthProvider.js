// useAuthentication.js
import { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, signInWithRedirect, GoogleAuthProvider, getRedirectResult, signOut } from 'firebase/auth';
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
  const router = useRouter();

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = async () => {
    setIsLoadingLoginUser(true);
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
      router.push('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (userChanged) => {
      if (userChanged) {
        const form = {
          "displayname": userChanged.displayName,
          "email": userChanged.email,
          "token": userChanged.stsTokenManager.accessToken,
          "photo_url": userChanged.photoURL,
          "emailVerified": userChanged.emailVerified,
          "uid": userChanged.uid
        };

        const response = await fetchData(process.env.NEXT_PUBLIC_API_URL + 'login.php', 'POST', form);
        if (response[0]) {
          setUser(response[0]);
          if (response[0].id === '') {
            setShowIdModal(true);
          }
      }
        }
        
      setIsLoadingLoginUser(false);
    });

    // Verificar si se completó el inicio de sesión con Google redirect
    const checkRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result.user) {
          setUser(result.user);
        }
      } catch (error) {
        console.error('Error al obtener el resultado de la redirección de Google:', error.message);
      }
    };

    checkRedirectResult();

    return () => unsubscribe();
  }, []);

  const changeId = async (newId) => {
    const sendData = {
      "id": encodeURI(newId.toUpperCase()),
      "uid": user.uid
    };
    await saveNewID(process.env.NEXT_PUBLIC_API_URL + 'saveNewId.php', 'POST', sendData).then((response) => {
      setUser({...user, "id": newId.toUpperCase()});
      console.log(user);
    });
  };

  const getUser = () => {
    return user;
  };

  return { user, showIdModal, isLoadingLoginUser, signInWithGoogle, signOutUser, getUser, setShowIdModal, changeId };
};

export const AuthProvider = ({ children }) => {
  const auth = useAuthenticationHook();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

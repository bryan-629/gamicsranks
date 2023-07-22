import { db, } from '@/firebase';
import { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, signInWithRedirect, signOut, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import useApi from '@/hooks/useApi';
import { useRouter } from 'next/router';
const AuthContext = createContext();

export const useAuthentication = () => {
  return useContext(AuthContext);
};

const useAuthenticationHook = () => {
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const { data: dataSaveNewID, isLoading: isLoadingSaveNewID, error: saveNewIDError, fetchData: saveNewID } = useApi();
  const [showIdModal, setShowIdModal] = useState(false);
  const [isLoadingLoginUser, setIsLoadingLoginUser] = useState(true);
  const router = useRouter();

  const signInWithGoogle = async () => {
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
    } catch (error) {
      console.error('Error al cerrar sesión:', error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userChanged) => {
      if (userChanged) {
        console.log(userChanged)
      }
      setUser(userChanged);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, isLoading, signInWithGoogle, signOutUser };
};

export const AuthProvider = ({ children }) => {
  const auth = useAuthenticationHook();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

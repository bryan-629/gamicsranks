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
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const { data: dataSaveNewID, isLoading: isLoadingSaveNewID, error: saveNewIDError, fetchData: saveNewID } = useApi();
  const { data, isLoading, error, fetchData } = useApi();
  const [showNewIdModal, setShowNewIdModal] = useState(false);
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
      router.push("/")
    } catch (error) {
      console.error('Error al cerrar sesión:', error.message);
    }
  };
  const callLoginphp = async (userChanged) =>{

    const form = {
      "displayname": userChanged.displayName,
      "email": userChanged.email,
      "token": userChanged.stsTokenManager.accessToken,
      "photo_url": userChanged.photoURL,
      "emailVerified": userChanged.emailVerified,
      "uid": userChanged.uid
    };

    const response = await fetchData(process.env.NEXT_PUBLIC_API_URL + 'login.php', 'POST', form);
        console.log(response)
        if (response) {
          if (response[0].id === "") {
            setShowNewIdModal(true);
          }
          setUser(response[0])
        }
       
  }

  const changeId = async (newId) => {
    const sendData = {
      "id": encodeURI(newId.toUpperCase()),
      "uid": user.uid
    };
    await saveNewID(process.env.NEXT_PUBLIC_API_URL + "saveNewId.php", "POST", sendData).then((response) => {
        setUser({ ...user, "id": newId.toUpperCase() });
        console.log(user);
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userChanged) => {
      if (userChanged != null) {
        console.log(userChanged)
        callLoginphp(userChanged)
      }
      setIsLoadingAuth(false);
    });

    return () => unsubscribe();
  }, []);

  return { user ,showNewIdModal, isLoadingAuth, signInWithGoogle, signOutUser, setShowNewIdModal,changeId};
};

export const AuthProvider = ({ children }) => {
  const auth = useAuthenticationHook();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

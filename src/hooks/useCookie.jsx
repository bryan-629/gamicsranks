import { useState } from 'react';

// Hook personalizado para crear y gestionar cookies
const useCookie = () => {
  // Estado para almacenar las cookies actuales
  const [cookies, setCookies] = useState({});

  // Función para crear una nueva cookie
  const setCookie = (name, value, days) => {
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + (days * 24 * 60 * 60 * 1000));

    const expires = "expires=" + expirationDate.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";

    // Actualiza el estado de las cookies con la nueva cookie creada
    setCookies({ ...cookies, [name]: value });
  };

  // Función para obtener el valor de una cookie por su nombre
  const getCookie = (name) => {
    const cookieName = name + "=";
    const cookieArray = document.cookie.split(';');

    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }
    return null;
  };

  // Función para eliminar una cookie por su nombre
  const deleteCookie = (name) => {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    // Actualiza el estado de las cookies eliminando la cookie
    const { [name]: deletedCookie, ...remainingCookies } = cookies;
    setCookies(remainingCookies);
  };

  return { cookies, setCookie, getCookie, deleteCookie };
};

export default useCookie;
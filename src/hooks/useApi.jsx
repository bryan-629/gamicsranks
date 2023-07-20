import { useState, useEffect } from 'react';

const useApi = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (url, method = 'GET', body = null) => {
    setIsLoading(true);

    try {
      const options = {
        method: method,
        body: body ? JSON.stringify(body) : null
      };
      const response = await fetch(url, options);

      const jsonData = await response.json();

      if (jsonData.error) {
        throw new Error('Error al realizar la solicitud');
      }

      setData(jsonData);
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  };

  return { data, isLoading, error, fetchData };
};

export default useApi;
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
        mode:"cors",
        body: body ? JSON.stringify(body) : null
      };
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Error al realizar la solicitud');
      }
      const jsonData = await response.json();
      
      if (jsonData.error) {
       
        throw new Error('Error al realizar la solicitud');
      }

      
      setData(jsonData);
      setIsLoading(false);
      return jsonData
    } catch (error) {
      setError(error.message);
    }

    
    
  };

  return { data, isLoading, error, fetchData };
};

export default useApi;
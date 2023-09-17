import { useState, useEffect } from 'react';

const useFetchAll = (urls, token) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = token ? { Authorization: token } : {};
        const promises = urls.map((url) =>
          fetch(url, { headers }).then((response) => response.json())
        );
        const responses = await Promise.all(promises);
        const responseData = responses.map((response) => response.data);
        setData(responseData);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [urls, token]);

  return { data, loading, error };
};

export default useFetchAll;

/**
 * The `useFetch` custom hook in JavaScript React fetches data from a specified URL, handles loading
 * and error states, and returns the data, loading status, and error message.
 * @returns The `useFetch` custom hook is returning an object with three properties: `data`, `loading`,
 * and `error`. These properties are used to manage the state of the data fetching process. The `data`
 * property holds the fetched data, `loading` indicates whether the data is still being fetched (true)
 * or the fetching process is complete (false), and `error` holds any error message
 */
// useFetch.js
import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Network response was not ok');
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;

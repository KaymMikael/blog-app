import { useState, useEffect } from "react";
import axios from "axios";

const useAxiosFetch = (dataUrl) => {
  const [data, setData] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchData = async (url) => {
      setIsLoading(true);
      try {
        const response = await axios.get(url, {
          signal:controller.signal
        });
        if (isMounted) {
          setData(response.data);
          setFetchError(null);
        }
      } catch (e) {
        if (isMounted) {
          setFetchError(e.message);
          setData([]);
        }
      } finally {
        isMounted && setIsLoading(false);
      }
    };
    fetchData(dataUrl);

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  return {data, fetchError, isLoading}
};

export default useAxiosFetch;
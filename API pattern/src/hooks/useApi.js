import { useEffect, useState } from "react";
import api from "../api/axios";

const useApi = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.get(url, {
          signal: controller.signal,
        });

        setData(response.data);
      } catch (error) {
        // Ignore cancelled requests
        if (error.code !== "ERR_CANCELED") {
          setError(error);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    // Cancel request on unmount
    return () => {
      controller.abort();
    };
  }, [url]);

  return {
    data,
    loading,
    error,
  };
};

export default useApi;
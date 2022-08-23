useEffect(() => {
  let cancelRequest = false;
  if (!url) return;

  const fetchData = async () => {
    dispatch({ type: 'FETCHING' });
    if (cache.current[url]) {
      const data = cache.current[url];
      dispatch({ type: 'FETCHED', payload: data });
    } else {
      try {
        const response = await fetch(url);
        const data = await response.blob();
        cache.current[url] = data;
        if (cancelRequest) return;
        dispatch({ type: 'FETCHED', payload: data });
      } catch (error) {
        if (cancelRequest) return;
        dispatch({ type: 'FETCH_ERROR', payload: error.message });
      }
    }
  };

  fetchData();

  return () => {
    cancelRequest = true;
  };
}, [url]);

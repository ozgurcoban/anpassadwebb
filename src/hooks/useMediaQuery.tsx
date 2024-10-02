import { useEffect, useState } from 'react';

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    if (mediaQuery.matches !== matches) {
      setMatches(mediaQuery.matches);
    }

    const listener = () => setMatches(mediaQuery.matches);
    mediaQuery.addListener(listener);

    return () => mediaQuery.removeListener(listener);
  }, [matches, query]);

  return matches;
};
export default useMediaQuery;

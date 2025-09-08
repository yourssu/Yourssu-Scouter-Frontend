import { useCallback, useEffect, useState } from 'react';
import { createSearchParams, SetURLSearchParams, useLocation, useNavigate } from 'react-router';

export function useSearchParams(): [URLSearchParams, SetURLSearchParams] {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useState(createSearchParams(location.search));

  const setSearchParamsWrapper = useCallback<SetURLSearchParams>(
    (nextInit, navigateOptions) => {
      setSearchParams((prevSearchParams) => {
        const newSearchParams = createSearchParams(
          typeof nextInit === 'function' ? nextInit(prevSearchParams) : nextInit,
        );
        navigate('?' + newSearchParams, navigateOptions);
        return newSearchParams;
      });
    },
    [navigate],
  );

  useEffect(() => {
    setSearchParams(createSearchParams(location.search));
  }, [location.search]);

  return [searchParams, setSearchParamsWrapper];
}

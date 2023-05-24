// import { useEffect, useState } from 'react';
// import { isBrowser, off, on } from '../helpers';

// function getInitialState(query: string, defaultState?: boolean) {
//   // Prevent a React hydration mismatch when a default value is provided by not defaulting to window.matchMedia(query).matches.
//   if (defaultState !== undefined) return defaultState;

//   if (isBrowser) return window?.matchMedia(query).matches;

//   // A default value has not been provided, and you are rendering on the server, warn of a possible hydration mismatch when defaulting to false.
//   if (process.env.NODE_ENV !== 'production') {
//     console.warn(
//       '`useMedia` When server side rendering, defaultState should be defined to prevent a hydration mismatch.'
//     );
//   }

//   return false;
// }

// export function useMedia(query: string, defaultState?: boolean) {
//   const [state, setState] = useState(() =>
//     getInitialState(query, defaultState)
//   );

//   useEffect(() => {
//     let isMounted = true;

//     const handler = () => {
//       if (!isMounted) return;
//       setState(window?.matchMedia(query).matches);
//     };

//     on(window, 'change', handler);
//     // setState(window?.matchMedia(query).matches);

//     return () => {
//       isMounted = false;
//       off(window, `change`, handler);
//     };
//   }, [query]);

//   return state;
// }

import { useEffect, useState } from 'react';
import { isBrowser } from '../helpers';

const getInitialState = (query: string, defaultState?: boolean) => {
  // Prevent a React hydration mismatch when a default value is provided by not defaulting to window.matchMedia(query).matches.
  if (defaultState !== undefined) {
    return defaultState;
  }

  if (isBrowser) {
    return window.matchMedia(query).matches;
  }

  // A default value has not been provided, and you are rendering on the server, warn of a possible hydration mismatch when defaulting to false.
  if (process.env.NODE_ENV !== 'production') {
    console.warn(
      '`useMedia` When server side rendering, defaultState should be defined to prevent a hydration mismatches.'
    );
  }

  return false;
};

const useMedia = (query: string, defaultState?: boolean) => {
  const [state, setState] = useState(getInitialState(query, defaultState));

  useEffect(() => {
    let mounted = true;
    const mql = window.matchMedia(query);
    const onChange = () => {
      if (!mounted) {
        return;
      }
      setState(!!mql.matches);
    };

    mql.addListener(onChange);
    setState(mql.matches);

    return () => {
      mounted = false;
      mql.removeListener(onChange);
    };
  }, [query]);

  return state;
};

export { useMedia };

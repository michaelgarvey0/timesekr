import * as React from 'react';
import { useLocation } from 'react-router-dom';

export function usePageTitle(title: string) {
  const location = useLocation();

  React.useEffect(() => {
    if (!location) return;
    if (!title) return;
    if (document.title === title) return;
    document.title = title;
  }, [location, title]);
}

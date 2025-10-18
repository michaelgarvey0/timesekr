'use client';
import { useEffect, useRef, useState } from 'react';
export function useDebouncedValue(value, wait, options = { leading: false }) {
  const [_value, setValue] = useState(value);
  const mountedRef = useRef(false);
  const timeoutRef = useRef(null);
  const cooldownRef = useRef(false);
  const cancel = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
  };
  useEffect(() => {
    if (mountedRef.current) {
      if (!cooldownRef.current && options.leading) {
        cooldownRef.current = true;
        setValue(value);
      } else {
        cancel();
        // @ts-ignore
        timeoutRef.current = window.setTimeout(() => {
          cooldownRef.current = false;
          setValue(value);
        }, wait);
      }
    }
  }, [value, options.leading, wait]);
  useEffect(() => {
    mountedRef.current = true;
    return cancel;
  }, []);
  return [_value, cancel];
}

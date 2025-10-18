import { useCallback, useEffect, useState } from 'react';

function oldSchoolCopy(text: string) {
  const tempTextArea = document.createElement('textarea');
  tempTextArea.value = text;
  document.body.appendChild(tempTextArea);
  tempTextArea.select();
  document.execCommand('copy');
  document.body.removeChild(tempTextArea);
}

export function useClipboard(text: string) {
  const [hasCopied, setHasCopied] = useState(false);
  const timeout = 1500;

  const onCopy = useCallback(() => {
    const handleCopy = async () => {
      try {
        if (navigator?.clipboard?.writeText) {
          await navigator.clipboard.writeText(text);
          setHasCopied(true);
        } else {
          throw new Error('writeText not supported');
        }
      } catch (e) {
        oldSchoolCopy(text);
        setHasCopied(true);
      }
    };

    handleCopy();
  }, [text]);

  useEffect(() => {
    let timeoutId: null | number = null;

    if (hasCopied) {
      timeoutId = window.setTimeout(() => {
        setHasCopied(false);
      }, timeout);
    }

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [timeout, hasCopied]);

  return { value: text, onCopy, hasCopied };
}

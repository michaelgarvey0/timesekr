'use client';
import * as React from 'react';
export function useDisclosure(options) {
  const provideAnchorEl = options?.provideAnchorEl ?? false;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSecondaryOpen, setSecondaryIsOpen] = React.useState(false);
  const onOpen = React.useCallback(
    (event) => {
      if (provideAnchorEl) {
        if (event) {
          setAnchorEl(event.currentTarget);
        }
      }
      setIsOpen(true);
    },
    [provideAnchorEl],
  );
  const onClose = React.useCallback(() => {
    if (provideAnchorEl) {
      setAnchorEl(null);
    }
    setIsOpen(false);
  }, [provideAnchorEl]);
  const onToggle = React.useCallback(() => setIsOpen((state) => !state), []);
  const onSecondaryOpen = React.useCallback(() => setSecondaryIsOpen(true), []);
  const onSecondaryClose = React.useCallback(() => setSecondaryIsOpen(false), []);
  const onSecondaryToggle = React.useCallback(() => setSecondaryIsOpen((state) => !state), []);
  return {
    anchorEl: provideAnchorEl ? anchorEl : undefined,
    setAnchorEl: provideAnchorEl ? setAnchorEl : undefined,
    isOpen,
    isSecondaryOpen,
    onOpen,
    onClose,
    onToggle,
    onSecondaryOpen,
    onSecondaryClose,
    onSecondaryToggle,
  };
}

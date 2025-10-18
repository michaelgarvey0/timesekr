'use client'
import * as React from 'react';

export type DisclosureProps = {
  isOpen: boolean;
  onOpen(event?: React.MouseEvent<any> | React.SyntheticEvent): void;
  onClose(): void;
  onToggle(): void;
  anchorEl?: HTMLButtonElement | null;
};

type DisclosureOptions = {
  provideAnchorEl: boolean;
};

export function useDisclosure(options?: DisclosureOptions) {
  const provideAnchorEl = options?.provideAnchorEl ?? false;
  const [anchorEl, setAnchorEl] = React.useState<any>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSecondaryOpen, setSecondaryIsOpen] = React.useState(false);

  const onOpen = React.useCallback(
    (event?: React.MouseEvent<any> | React.SyntheticEvent) => {
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

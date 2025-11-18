'use client';

import { Dialog, DialogContent, DialogActions, DialogTitle, Box, Divider } from '@mui/material';
import { ReactNode } from 'react';
import { border } from '@/theme/tokens';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  actions?: ReactNode;
  header?: ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  customMaxWidth?: number;
}

export default function Modal({
  open,
  onClose,
  children,
  actions,
  header,
  maxWidth = 'sm',
  customMaxWidth
}: ModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={customMaxWidth ? false : maxWidth}
      fullWidth={!customMaxWidth}
      PaperProps={{
        sx: {
          borderRadius: `${border.radius.md}px`,
          ...(customMaxWidth && { maxWidth: `${customMaxWidth}px`, width: '100%' }),
        }
      }}
    >
      {header && (
        <>
          <DialogTitle sx={{ p: 3, pb: 2 }}>
            {header}
          </DialogTitle>
          <Divider />
        </>
      )}
      <DialogContent sx={{ p: 3 }}>
        {children}
      </DialogContent>
      {actions && (
        <>
          <Divider />
          <DialogActions sx={{ p: 3 }}>
            {actions}
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}

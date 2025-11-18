'use client';

import { Dialog, DialogContent, DialogActions } from '@mui/material';
import { ReactNode } from 'react';
import { border } from '@/theme/tokens';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  actions?: ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  customMaxWidth?: number;
}

export default function Modal({
  open,
  onClose,
  children,
  actions,
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
          ...(customMaxWidth && { maxWidth: `${customMaxWidth}px` }),
        }
      }}
    >
      <DialogContent sx={{ p: 3 }}>
        {children}
      </DialogContent>
      {actions && (
        <DialogActions sx={{ px: 3, pb: 3, pt: 0 }}>
          {actions}
        </DialogActions>
      )}
    </Dialog>
  );
}

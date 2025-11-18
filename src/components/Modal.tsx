'use client';

import { Dialog, DialogContent, DialogActions, Box } from '@mui/material';
import { ReactNode } from 'react';
import { border } from '@/theme/tokens';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  actions?: ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export default function Modal({
  open,
  onClose,
  children,
  actions,
  maxWidth = 'sm'
}: ModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: `${border.radius.md}px`,
          p: 2,
        }
      }}
    >
      <DialogContent sx={{ p: 3 }}>
        {children}
      </DialogContent>
      {actions && (
        <DialogActions sx={{ px: 3, pb: 3 }}>
          {actions}
        </DialogActions>
      )}
    </Dialog>
  );
}

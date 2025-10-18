'use client';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
} from '@mui/material';
import * as React from 'react';
export default function ConfirmDialog({
  title,
  isOpen,
  onClose,
  description,
  id,
  onSubmit = () => {},
  primaryButtonColor = 'primary',
  primaryButtonLabel = 'Confirm',
  primaryDisabledTooltipText,
  isPrimaryButtonLoading = false,
  secondaryButtonLabel = 'Cancel',
  onSecondaryAction = () => {},
  formId,
  children,
  hideActionButtons = false,
  primaryButtonDisabled = false,
  dialogMaxWidth = 'sm',
  dialogSlotProps,
}) {
  const isControlledByForm = !!formId;
  const handleCancel = () => {
    onSecondaryAction();
    onClose();
  };
  const handleConfirm = async (event) => {
    await onSubmit(event);
    onClose();
  };
  function wrapButton(content) {
    if (primaryButtonDisabled) {
      return (
        <Tooltip title={primaryDisabledTooltipText} placement="top">
          <Box sx={{ ml: 1 }}>{content}</Box>
        </Tooltip>
      );
    } else {
      return content;
    }
  }
  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { minWidth: 300, p: 0 } }}
      maxWidth={dialogMaxWidth}
      open={isOpen}
      onClose={handleCancel}
      PaperProps={{
        elevation: 3,
        sx: {
          border: (theme) => `2px solid ${theme.palette.gray['300']}`,
        },
      }}
      slotProps={dialogSlotProps}
      id={id}
    >
      <DialogTitle
        sx={{
          fontSize: '2xl',
          fontWeight: 600,
          pt: 3,
          px: 3,
          pb: 1,
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent
        sx={{
          px: 3,
          pb: 3,
        }}
      >
        <Box
          sx={{
            fontSize: 'md',
            color: 'gray.600',
            mb: 2,
          }}
        >
          {description}
        </Box>
        {children}
      </DialogContent>
      {!hideActionButtons && (
        <DialogActions
          sx={{
            p: 2,
            borderTop: (theme) => `1px solid ${theme.palette.gray['200']}`,
            bgcolor: 'gray.100',
            gap: 1,
            justifyContent: 'space-between',
            borderBottomRightRadius: 12,
            borderBottomLeftRadius: 12,
          }}
        >
          <Button variant="outlined" color="secondary" autoFocus onClick={handleCancel}>
            {secondaryButtonLabel}
          </Button>
          {wrapButton(
            <LoadingButton
              form={formId}
              variant="contained"
              color={primaryButtonColor}
              type={isControlledByForm ? 'submit' : undefined}
              onClick={isControlledByForm ? undefined : handleConfirm}
              loading={isPrimaryButtonLoading}
              disabled={primaryButtonDisabled}
            >
              {primaryButtonLabel}
            </LoadingButton>,
          )}
        </DialogActions>
      )}
    </Dialog>
  );
}

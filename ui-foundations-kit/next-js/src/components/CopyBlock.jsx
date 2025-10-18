'use client';
import { Box, IconButton, Tooltip } from '@mui/material';
import { TbClipboardCheck, TbClipboardList } from 'react-icons/tb';
import { useClipboard } from '../hooks/useClipboard';
export function CopyBlock({ copyValue }) {
  const { onCopy, hasCopied } = useClipboard(copyValue);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 0.5,
        height: '100%',
        color: 'gray.500',
      }}
    >
      <Box
        sx={{
          fontSize: 'xs',
          fontFamily: 'ui-monospace, monospace',
          lineHeight: 1.5,
          display: 'flex',
          gap: 0.5,
          alignItems: 'center',
        }}
      >
        {copyValue}
        <Tooltip title={hasCopied ? 'Copied!' : 'Copy'}>
          {hasCopied ? (
            <IconButton onClick={onCopy}>
              <TbClipboardCheck size={14} />
            </IconButton>
          ) : (
            <IconButton onClick={onCopy}>
              <TbClipboardList size={14} />
            </IconButton>
          )}
        </Tooltip>
      </Box>
    </Box>
  );
}

'use client';

import { Box } from '@mui/material';
import { ReactNode } from 'react';

interface MobileSimulatorProps {
  children: ReactNode;
}

export default function MobileSimulator({ children }: MobileSimulatorProps) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#e5e7eb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
      }}
    >
      {/* iPhone Frame */}
      <Box
        sx={{
          width: 390,
          height: 852,
          bgcolor: 'white',
          borderRadius: '40px',
          boxShadow: '0 0 0 14px #1f2937, 0 0 60px rgba(0,0,0,0.3)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Notch */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 140,
            height: 30,
            bgcolor: '#1f2937',
            borderBottomLeftRadius: '20px',
            borderBottomRightRadius: '20px',
            zIndex: 9999,
          }}
        />

        {/* Content */}
        <Box
          sx={{
            width: '100%',
            height: '100%',
            overflow: 'auto',
            position: 'relative',
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-track': {
              background: '#f1f1f1',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#888',
              borderRadius: '3px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#555',
            },
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}

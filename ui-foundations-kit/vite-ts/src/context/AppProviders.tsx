import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import * as React from 'react';

import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '../theme';

import { Toaster } from 'sonner';
import { BroadcastTourProvider } from '~/context/BroadcastTourProvider';
import { ThemeCustomizationProvider } from '~/context/ThemeCustomizationProvider';
import { TourProvider } from '~/context/TourProvider';
export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeCustomizationProvider>
      <ThemeProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <BroadcastTourProvider>
            <TourProvider>
              <CssBaseline />
              <Toaster />
              {children}
            </TourProvider>
          </BroadcastTourProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </ThemeCustomizationProvider>
  );
}

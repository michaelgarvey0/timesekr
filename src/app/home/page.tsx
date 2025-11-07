'use client';

import { useState } from 'react';
import { Box, Button, ButtonGroup } from '@mui/material';
import EmptyHomePage from './empty-state';
import PopulatedHomePage from './populated-state';
import NoCalendarHomePage from './no-calendar-state';

export default function HomePage() {
  const [viewState, setViewState] = useState<'no-calendar' | 'empty' | 'populated'>('no-calendar');

  return (
    <Box>
      {/* Toggle Controls */}
      <Box sx={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1000 }}>
        <ButtonGroup variant="contained" size="small">
          <Button
            onClick={() => setViewState('no-calendar')}
            variant={viewState === 'no-calendar' ? 'contained' : 'outlined'}
          >
            No Calendar
          </Button>
          <Button
            onClick={() => setViewState('empty')}
            variant={viewState === 'empty' ? 'contained' : 'outlined'}
          >
            Empty
          </Button>
          <Button
            onClick={() => setViewState('populated')}
            variant={viewState === 'populated' ? 'contained' : 'outlined'}
          >
            Populated
          </Button>
        </ButtonGroup>
      </Box>

      {/* Content */}
      {viewState === 'no-calendar' && <NoCalendarHomePage />}
      {viewState === 'empty' && <EmptyHomePage />}
      {viewState === 'populated' && <PopulatedHomePage />}
    </Box>
  );
}

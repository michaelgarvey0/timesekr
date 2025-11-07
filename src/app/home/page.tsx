'use client';

import { useState } from 'react';
import { Box, Button, ButtonGroup } from '@mui/material';
import EmptyHomePage from './empty-state';
import PopulatedHomePage from './populated-state';

export default function HomePage() {
  const [showEmpty, setShowEmpty] = useState(true);

  return (
    <Box>
      {/* Toggle Controls */}
      <Box sx={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1000 }}>
        <ButtonGroup variant="contained" size="small">
          <Button
            onClick={() => setShowEmpty(true)}
            variant={showEmpty ? 'contained' : 'outlined'}
          >
            Empty
          </Button>
          <Button
            onClick={() => setShowEmpty(false)}
            variant={!showEmpty ? 'contained' : 'outlined'}
          >
            Populated
          </Button>
        </ButtonGroup>
      </Box>

      {/* Content */}
      {showEmpty ? <EmptyHomePage /> : <PopulatedHomePage />}
    </Box>
  );
}

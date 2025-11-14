'use client';

import { useState } from 'react';
import { Box, Button, ButtonGroup } from '@mui/material';
import DesignOption1 from './design-option-1';
import DesignOption3 from './design-option-3';

export default function HomePage() {
  const [viewState, setViewState] = useState<'option1' | 'option3'>('option1');

  return (
    <Box>
      {/* Toggle Controls */}
      <Box sx={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1000 }}>
        <ButtonGroup variant="contained" size="small">
          <Button
            onClick={() => setViewState('option1')}
            variant={viewState === 'option1' ? 'contained' : 'outlined'}
          >
            Design 1: Tabs
          </Button>
          <Button
            onClick={() => setViewState('option3')}
            variant={viewState === 'option3' ? 'contained' : 'outlined'}
          >
            Design 2: Sidebar
          </Button>
        </ButtonGroup>
      </Box>

      {/* Content */}
      {viewState === 'option1' && <DesignOption1 />}
      {viewState === 'option3' && <DesignOption3 />}
    </Box>
  );
}

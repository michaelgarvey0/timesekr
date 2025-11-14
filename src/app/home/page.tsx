'use client';

import { useState } from 'react';
import { Box, Button, ButtonGroup, Stack } from '@mui/material';
import DesignOption1 from './design-option-1';
import DesignOption3 from './design-option-3';

export default function HomePage() {
  const [viewState, setViewState] = useState<'option1' | 'option3'>('option1');
  const [cardView, setCardView] = useState<'detailed' | 'compact'>('detailed');

  return (
    <Box>
      {/* Toggle Controls */}
      <Box sx={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1000 }}>
        <Stack spacing={1}>
          {/* Design Toggle */}
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

          {/* Card View Toggle */}
          <ButtonGroup variant="contained" size="small">
            <Button
              onClick={() => setCardView('detailed')}
              variant={cardView === 'detailed' ? 'contained' : 'outlined'}
              color="secondary"
            >
              Detailed
            </Button>
            <Button
              onClick={() => setCardView('compact')}
              variant={cardView === 'compact' ? 'contained' : 'outlined'}
              color="secondary"
            >
              Compact
            </Button>
          </ButtonGroup>
        </Stack>
      </Box>

      {/* Content */}
      {viewState === 'option1' && <DesignOption1 cardView={cardView} />}
      {viewState === 'option3' && <DesignOption3 cardView={cardView} />}
    </Box>
  );
}

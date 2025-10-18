'use client'
import { Box, Button, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import * as React from 'react';
import { DisclosureProps } from '~/hooks/useDisclosure';
import useLocalStorage from '~/hooks/useLocalStorage';

export function NpsSurvey({ disclosure }: { disclosure: DisclosureProps }) {
  const [rating, setRating] = useLocalStorage<number | null>('npsSurveyRating', null);

  const handleRating = (event: React.MouseEvent<HTMLElement>, newRating: number | null) => {
    setRating(newRating);
  };

  return (
    <Box
      component={motion.div}
      initial={{ y: 200 }}
      exit={{ y: 200 }}
      animate={disclosure.isOpen ? { y: -32 } : { y: 200 }}
      transition={{
        type: 'spring',
        stiffness: 50,
      }}
      sx={{
        position: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 5,
      }}
    >
      <Box
        sx={{
          padding: 0.5,
          backgroundColor: 'gray.50',
          border: (theme) => `1px solid ${theme.palette.grey[300]}`,
          borderRadius: 2.5,
          boxShadow: 5,
        }}
      >
        <Box
          sx={{
            position: 'relative',
            height: 'max-content',
            padding: 2,
            paddingBottom: 0.5,
            width: 'max-content',
            border: (theme) => `2px solid ${theme.palette.grey[200]}`,
            borderRadius: 2,
            backgroundColor: 'background.paper',
          }}
        >
          <Box sx={{ position: 'relative' }}>
            <Typography
              sx={{
                fontSize: 'md',
                fontWeight: 500,
              }}
            >
              How likely are you to recommend our product to a friend?
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: 1,
                mt: 1,
                fontSize: 'xs',
                color: 'gray.500',
              }}
            >
              <Box>Not likely</Box>
              <Box>Very likely</Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
              <ToggleButtonGroup
                value={rating}
                exclusive
                onChange={handleRating}
                aria-label="text rating"
                sx={{
                  width: '100%',
                }}
              >
                <ToggleButton value={0} aria-label="zero">
                  <NumberBox>0</NumberBox>
                </ToggleButton>
                <ToggleButton value={1} aria-label="one">
                  <NumberBox>1</NumberBox>
                </ToggleButton>
                <ToggleButton value={2} aria-label="two">
                  <NumberBox>2</NumberBox>
                </ToggleButton>
                <ToggleButton value={3} aria-label="three">
                  <NumberBox>3</NumberBox>
                </ToggleButton>
                <ToggleButton value={4} aria-label="four">
                  <NumberBox>4</NumberBox>
                </ToggleButton>
                <ToggleButton value={5} aria-label="five">
                  <NumberBox>5</NumberBox>
                </ToggleButton>
                <ToggleButton value={6} aria-label="six">
                  <NumberBox>6</NumberBox>
                </ToggleButton>
                <ToggleButton value={7} aria-label="seven">
                  <NumberBox>7</NumberBox>
                </ToggleButton>
                <ToggleButton value={8} aria-label="eight">
                  <NumberBox>8</NumberBox>
                </ToggleButton>
                <ToggleButton value={9} aria-label="nine">
                  <NumberBox>9</NumberBox>
                </ToggleButton>
                <ToggleButton value={10} aria-label="ten">
                  <NumberBox>10</NumberBox>
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                opacity: 0.5,
                marginTop: 0.5,
                transition: 'opacity 0.2s',
                '&:hover': {
                  opacity: 1,
                },
              }}
            >
              <Button
                size="small"
                color="secondary"
                sx={{
                  fontSize: 'xs',
                }}
                onClick={disclosure.onClose}
              >
                Continue without answering
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function NumberBox({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 24,
        height: 24,
        fontWeight: 500,
      }}
    >
      {children}
    </Box>
  );
}

'use client'
import { Box, IconButton, LinearProgress, useTheme } from '@mui/material';
import { TourProvider as TourProviderBase, useTour as useTourBase } from '@reactour/tour';
import * as React from 'react';
import { TbChevronLeft, TbChevronRight, TbCircleCheck, TbX } from 'react-icons/tb';

import { useBroadcastTour } from '~/context/BroadcastTourProvider';
import { TourIds, TOURS_DATA } from '~/data/tours';

export function doesTourNameHaveTour(tourName: string): tourName is TourIds {
  return tourName in TOURS_DATA;
}

function findTourData(tourName: string) {
  let steps = [];
  let tour: any = {};
  if (doesTourNameHaveTour(tourName)) {
    tour = TOURS_DATA[tourName];
    steps = tour?.tourSteps;
  }
  return {
    steps,
    tour,
  };
}

export function TourProvider({ children }: { children: React.ReactNode }) {
  const theme: any = useTheme();
  const { activeTourName, setIsTourOpen } = useBroadcastTour();

  const { steps, tour } = findTourData(activeTourName);

  return (
    <TourProviderBase
      // reset the key with each page so that we get a new set of steps saved in the packages useState hook
      key={`steps-${activeTourName}`}
      steps={steps ? steps : []}
      padding={8}
      disableInteraction={false}
      afterOpen={() => {
        // lock the scrollbar when the tour is open
        const body = document.querySelector('body');
        if (body) {
          body.style.overflow = 'hidden';
        }
      }}
      beforeClose={() => {
        const body = document.querySelector('body');
        if (body) {
          body.style.overflow = 'inherit';
        }
      }}
      onClickClose={({ setCurrentStep, setIsOpen }) => {
        setCurrentStep(0);
        setIsOpen(false);
        setIsTourOpen(false);
      }}
      onClickMask={({ setCurrentStep, setIsOpen }) => {
        // allow the tour to stay open when we click outside the mask with an option
        if (tour?.disableCloseOnClickMask) return;
        setCurrentStep(0);
        setIsOpen(false);
        setIsTourOpen(false);
      }}
      components={{
        Badge: () => null,
        Content: ({ content, currentStep }) => {
          return (
            <Box>
              <Box
                sx={{
                  fontSize: 'xs',
                  fontWeight: 500,
                  color: 'gray.400',
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 0.5,
                }}
              >
                Step {currentStep + 1}{' '}
                <Box
                  component="span"
                  sx={{
                    fontSize: 9,
                    color: 'gray.300',
                  }}
                >
                  / {steps?.length || 0}
                </Box>
              </Box>
              <Box
                sx={{
                  mt: 1.5,
                  mb: 1,
                }}
              >
                {content}
              </Box>
            </Box>
          );
        },
        Close: ({ onClick }) => {
          return (
            <IconButton
              id="tour-close-button"
              onClick={onClick}
              sx={{
                position: 'absolute',
                top: 12,
                right: 16,
              }}
            >
              <TbX size={20} />
            </IconButton>
          );
        },
        Navigation: ({ currentStep, steps, setCurrentStep, setIsOpen }) => {
          const hasPrevStep = currentStep > 0;
          const hasNextStep = currentStep < steps.length - 1;
          const currentReadableStep = currentStep + 1;
          return (
            <Box
              sx={{
                color: 'gray.600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <IconButton disabled={!hasPrevStep} onClick={() => setCurrentStep(currentStep - 1)}>
                <TbChevronLeft size={20} />
              </IconButton>
              <Box sx={{ minWidth: 50 }}>
                <LinearProgress
                  sx={{
                    borderRadius: 999,
                  }}
                  variant="determinate"
                  value={(currentReadableStep / steps.length) * 100}
                />
              </Box>
              {hasNextStep ? (
                <IconButton disabled={!hasNextStep} onClick={() => setCurrentStep(currentStep + 1)}>
                  <TbChevronRight size={20} />
                </IconButton>
              ) : (
                <IconButton
                  onClick={() => {
                    setCurrentStep(0);
                    setIsOpen(false);
                    setIsTourOpen(false);
                  }}
                >
                  <TbCircleCheck size={20} />
                </IconButton>
              )}
            </Box>
          );
        },
      }}
      styles={{
        maskArea: (base) => ({
          ...base,
          backgroundColor: 'red',
          rx: 12,
        }),
        maskWrapper: (base) => ({
          ...base,
          color: theme.palette.gray['800'],
          opacity: 0.4,
          // dark mode styles
          '[data-mui-color-scheme="dark"] &': {
            color: theme.palette.gray['300'],
            opacity: 0.6,
          },
        }),
        popover: (base) => ({
          ...base,
          backgroundColor: theme.palette.background.paper,
          padding: 16,
          borderRadius: `calc(${theme.shape.borderRadius} * 2)`,
          boxShadow: theme.shadows[3],
          borderWidth: 1,
          borderColor: theme.palette.gray['300'],
          borderStyle: 'solid',
        }),
        highlightedArea: (base) => ({
          ...base,
          stroke: theme.palette.primary['500'],
          strokeWidth: 3,
          display: 'block',
          rx: 12,
        }),
      }}
    >
      {children}
    </TourProviderBase>
  );
}

// make sure we have an effect listening across all pages
export function useRegisterTours() {
  const { setIsOpen } = useTourBase();
  const { isTourOpen } = useBroadcastTour();

  // synchronize our own controlled state with the 3rd party library
  React.useEffect(() => {
    setIsOpen(isTourOpen);
  }, [isTourOpen, setIsOpen]);

  return;
}

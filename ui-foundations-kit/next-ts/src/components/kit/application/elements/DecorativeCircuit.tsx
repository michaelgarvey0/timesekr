'use client'
import { keyframes } from '@emotion/react';
import { Box } from '@mui/material';
import { Fade, useTheme } from '@mui/material';
import * as React from 'react';

export default function DecorativeCircuit() {
  return <CircuitBoard />;
}

const grow = keyframes`
  0%% {transform: scale(0);}
  50%, 100% {transform: scale(8);}
`;

const turnOn = keyframes`
  0% {filter: grayscale(1) contrast(0.85) ;}
  100% {filter: grayscale(0) contrast(1);}
`;

const pulse = keyframes`
  0% {background-color: #a3a3a3;}
  70% {background-color: #a3a3a3;}
  80% {background-color: #fef9c3;}
  90% {background-color: #a3a3a3;}
  100% {background-color: #a3a3a3;}
`;

function CircuitBoard() {
  const theme = useTheme();
  const roundedness = 1.5;
  const [key, setKey] = React.useState(0);
  return (
    <Fade in={true}>
      <Box
        sx={{
          padding: 0.75,
          background:
            'linear-gradient(to top, transparent, rgba(50,50,50,0.03))',
          borderWidth: 0.5,
          borderColor: 'gray.100',
          borderStyle: 'solid',
          borderRadius: roundedness * 4,
        }}
      >
        <Box
          sx={{
            backgroundClip: 'padding-box',
            position: 'relative',
            height: '110px',
            width: '110px',
            borderRadius: roundedness * 3.5,
            backgroundImage: `linear-gradient(to bottom, ${theme.palette.background.default}, rgba(0,0,0,0.05))`,
            borderWidth: 1,
            borderColor: 'gray.200',
            borderStyle: 'solid',
            overflow: 'hidden',
            boxShadow: 2,
          }}
        >
          <Box
            onClick={() => {
              setKey(key => key + 1);
            }}
            key={key}
            sx={{
              position: 'absolute',
              zIndex: 4,
              inset: 6,
              borderWidth: 5,
              borderRadius: roundedness * 2.75,
              borderStyle: 'solid',
              borderColor: 'blue.500',
              animation: `${turnOn} 1.25s ease-in`,
              '&:hover': {
                cursor: 'pointer',
              },
            }}
          />
          <Box
            sx={{
              display: 'block',
              position: 'absolute',
              inset: 8,
              borderColor: 'primary.700',
              borderWidth: 6,
              borderStyle: 'solid',
              borderRadius: roundedness * 2.5,
              overflow: 'hidden',
            }}
          >
            {/* Pulsing circuit electricity */}
            <Box
              sx={{
                animation: `${grow} 2.5s infinite ease-in-out`,
                borderColor: 'yellow.400',
                borderWidth: 8,
                borderStyle: 'solid',
                position: 'absolute',
                inset: 24,
                borderRadius: 999,
                zIndex: 0,
                filter: 'blur(1px)',
              }}
            ></Box>
            <Box
              sx={{
                position: 'absolute',
                zIndex: 3,
                mixBlendMode: 'overlay',
                inset: 0,
                opacity: 0.5,
                backgroundImage: `linear-gradient(135deg,${theme.palette.primary['500']} 0,${theme.palette.violet['500']} 25%,${theme.palette.blue['500']} 50%,${theme.palette.violet['500']} 70%,${theme.palette.primary['500']} 85%)`,
              }}
            ></Box>
            <Box
              sx={{
                position: 'relative',
                overflow: 'hidden',
                height: '100%',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                willChange: 'transform',
                backgroundColor: 'rgba(0,0,0,0.5)',
                borderRadius: roundedness * 1.75,
                boxShadow: 'inset 0 0px 12px 0 hsla(0,0%,0%,0.5)',
                zIndex: 2,
              }}
            >
              <Box
                sx={{
                  // opacity: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '110%',
                  width: '110%',
                  color: 'gray.800',
                }}
              >
                <svg
                  width='100'
                  height='100'
                  viewBox='0 0 100 100'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <g clipPath='url(#clip0_6518_84461)'>
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M65.7071 8L73.3536 0.353553L73 0H88.2929L80.2929 8H65.7071ZM64.1464 8.14645L72.2929 0H70.7071L61.5 9.20711V24.0429L62.5 23.0429V10V9.79289L62.6464 9.64645L64.1464 8.14645ZM61.5 36.5V25.4571L63.3536 23.6036L63.5 23.4571V23.25V10.2071L64.7071 9H80.5H80.7071L80.8536 8.85355L89.3536 0.353553L89 0H100V12L99.6464 11.6464L91.1464 20.1464L91 20.2929V20.5V34.2929L88.7929 36.5H75.75H75.5429L75.3964 36.6464L73.5429 38.5H62.5V39.5H90H90.2071L90.3536 39.3536L100 29.7071V40.5H62.5V41.5H100V42.5H62.5V43.5H82.0429L81.0429 44.5H62.5V45.5H81.25H81.4571L81.6036 45.3536L83.4571 43.5H100V55.5H83.4571L81.6036 53.6464L81.4571 53.5H81.25H62.5V54.5H81.0429L82.0429 55.5H62.5V56.5H100V57.5H62.5V58.5H100V69.2929L90.3536 59.6464L90.2071 59.5H90H62.5V60.5H73.5429L75.3964 62.3536L75.5429 62.5H75.75H88.7929L91 64.7071V78.5V78.7071L91.1464 78.8536L99.6464 87.3536L100 87V100H71L71.3536 99.6464L61.5 89.7929V74.9571L62.5 75.9571V89V89.2071L62.6464 89.3536L64.1464 90.8536L72.6464 99.3536L73.3536 98.6464L65.7071 91H80.2929L88.6464 99.3536L89.3536 98.6464L80.8536 90.1464L80.7071 90H80.5H64.7071L63.5 88.7929V75.75V75.5429L63.3536 75.3964L61.5 73.5429V62.5H60.5V90V90.2071L60.6464 90.3536L70.2929 100H59.5V62.5H58.5V100H57.5V62.5H56.5V82.0429L55.5 81.0429V62.5H54.5V81.25V81.4571L54.6464 81.6036L56.5 83.4571V100H43.5V83.4571L45.3536 81.6036L45.5 81.4571V81.25V62.5H44.5V81.0429L43.5 82.0429V62.5H42.5V100H41.5V62.5H40.5V100H29.7071L39.3536 90.3536L39.5 90.2071V90V62.5H38.5V73.5429L36.6464 75.3964L36.5 75.5429V75.75V88.7929L35.2929 90H19.5H19.2929L19.1464 90.1464L10.6464 98.6464L11.3536 99.3536L19.7071 91H34.2929L26.6464 98.6464L27.3536 99.3536L35.8536 90.8536L37.3536 89.3536L37.5 89.2071V89V75.9571L38.5 74.9571V89.7929L28.6464 99.6464L29 100H0V87L0.353555 87.3536L8.85355 78.8536L9 78.7071V78.5V64.7071L11.2071 62.5H24.25H24.4571L24.6036 62.3536L26.4571 60.5H37.5V59.5H10H9.79289L9.64645 59.6464L0 69.2929V58.5H37.5V57.5H0V56.5H37.5V55.5H17.9571L18.9571 54.5H37.5V53.5H18.75H18.5429L18.3964 53.6464L16.5429 55.5H0V43.5H16.5429L18.3964 45.3536L18.5429 45.5H18.75H37.5V44.5H18.9571L17.9571 43.5H37.5V42.5H0V41.5H37.5V40.5H0V29.7071L9.64645 39.3536L9.79289 39.5H10H37.5V38.5H26.4571L24.6036 36.6464L24.4571 36.5H24.25H11.2071L9 34.2929V20.5V20.2929L8.85355 20.1464L0.353555 11.6464L0 12V0H11L10.6464 0.353553L19.1464 8.85355L19.2929 9H19.5H35.2929L36.5 10.2071V23.25V23.4571L36.6464 23.6036L38.5 25.4571V36.5H39.5V9V8.79289L39.3536 8.64645L30.7071 0H40.5V36.5H41.5V0H42.5V36.5H43.5V16.9571L44.5 17.9571V36.5H45.5V17.75V17.5429L45.3536 17.3964L43.5 15.5429V0H56.5V15.5429L54.6464 17.3964L54.5 17.5429V17.75V36.5H55.5V17.9571L56.5 16.9571V36.5H57.5V0H58.5V36.5H59.5V0H69.2929L60.6464 8.64645L60.5 8.79289V9V36.5H61.5ZM25.0429 60.5H10.2071L0.353554 70.3536L0 70V86.2929L8 78.2929L8 65.7071L1.35355 72.3536L0.646448 71.6464L8.14645 64.1464L10.6464 61.6464L10.7929 61.5H11H24.0429L25.0429 60.5ZM100 86.2929V70L99.6464 70.3536L89.7929 60.5H74.9571L75.9571 61.5H89H89.2071L89.3536 61.6464L91.8536 64.1464L99.3536 71.6464L98.6464 72.3536L92 65.7071V78.2929L100 86.2929ZM74.9571 38.5H89.7929L99.6464 28.6464L100 29V12.7071L92 20.7071V33.2929L98.6464 26.6464L99.3536 27.3536L91.8536 34.8536L89.3536 37.3536L89.2071 37.5H89H75.9571L74.9571 38.5ZM34.2929 8L26.6464 0.353553L27 0H11.7071L19.7071 8H34.2929ZM35.8536 8.14645L27.7071 0H29.2929L38.5 9.20711V24.0429L37.5 23.0429V10V9.79289L37.3536 9.64645L35.8536 8.14645ZM25.0429 38.5L24.0429 37.5H11H10.7929L10.6464 37.3536L8.14645 34.8536L0.646448 27.3536L1.35355 26.6464L8 33.2929L8 20.7071L0 12.7071V29L0.353554 28.6464L10.2071 38.5H25.0429Z'
                      fill='currentColor'
                    />
                  </g>
                  <defs>
                    <clipPath id='clip0_6518_84461'>
                      <rect width='100' height='100' fill='white' />
                    </clipPath>
                  </defs>
                </svg>
              </Box>
              <SmallCircuitConnectors top={27} left={9} />
              <SmallCircuitConnectors top={47} left={9} />
              <SmallCircuitConnectors top={27} left={65} />
              <SmallCircuitConnectors top={47} left={65} />
              <Box
                sx={{
                  position: 'absolute',
                  inset: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(255,255,255,0.3)',
                  borderRadius: roundedness * 1.5,
                  backdropFilter: 'blur(1px)',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    backgroundColor: 'gray.800',
                    inset: 4,
                    borderRadius: roundedness * 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '&::before': {
                      content: "''",
                      position: 'absolute',
                      inset: 2,
                      borderRadius: roundedness * 0.8,
                      borderColor: 'gray.600',
                      borderStyle: 'solid',
                      borderWidth: 0.5,
                    },
                  }}
                >
                  <Box
                    sx={{
                      height: 20,
                      width: 20,
                      borderRadius: '50%',
                      backgroundColor: 'gray.100',
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Fade>
  );
}

function SmallCircuitConnectors({
  top = 27,
  left = 5,
}: {
  top?: number;
  left?: number;
}) {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: top,
        left: left,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.5px',
      }}
    >
      <SmallCircuits />
      <SmallCircuits />
      <SmallCircuits />
    </Box>
  );
}

function SmallCircuits() {
  return (
    <Box
      sx={{
        opacity: 0.75,
        position: 'relative',
        width: 6,
        height: '1px',
        animation: `${pulse} 2.5s infinite ease-in-out`,
      }}
    />
  );
}

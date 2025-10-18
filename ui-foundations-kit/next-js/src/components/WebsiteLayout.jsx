'use client';
import { Box, Container } from '@mui/material';
import { BackgroundGridlines } from '../components/BackgroundGridlines';
import { ContainerGridlines } from '../components/ContainerGridlines';
import { DottedGridline } from '../components/DottedGridline';
import { Footer } from '../components/Footer';
import { GradientBlur } from '../components/GradientBlur';
import { Header } from '../components/Header';
export function DefaultLayout({ children }) {
  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <ContainerGridlines />
      <BackgroundGridlines />
      <Container
        sx={{
          py: 2,
        }}
      >
        <Header />
      </Container>
      <DottedGridline />
      <GradientBlur
        color="violet.200"
        size={250}
        coordinates={{
          top: 50,
          right: '33%',
        }}
        opacity={0.4}
      />
      <GradientBlur
        color="blue.300"
        size={375}
        coordinates={{
          top: 60,
          right: '20%',
        }}
        opacity={0.25}
      />
      <GradientBlur
        size={400}
        coordinates={{
          right: { xs: -800, sm: '0%' },
          bottom: 0,
          top: 0,
        }}
        opacity={0.25}
      />
      <GradientBlur
        size={300}
        coordinates={{
          left: -100,
          bottom: 0,
          top: 150,
        }}
        opacity={0.2}
      />
      <Box
        sx={{
          zIndex: 1,
        }}
      >
        {children}
      </Box>
      <DottedGridline />
      <Container
        sx={{
          my: 4,
        }}
      >
        <Box>
          <Footer />
        </Box>
      </Container>
    </Box>
  );
}

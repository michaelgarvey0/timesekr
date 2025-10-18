import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { BackgroundGridlines } from '../BackgroundGridlines';
import { ContainerGridlines } from '../ContainerGridlines';
import AppAppBar from './components/AppAppBar';
import FAQ from './components/FAQ';
import { Features } from './components/Features';
import Footer from './components/Footer';
import Hero from './components/Hero';
import { Pricing } from './components/Pricing';
import { Stats } from './components/Stats';
import { Testimonials } from './components/Testimonials';

export default function LandingPage() {
  return (
    <Box sx={{ position: 'relative' }}>
      <ContainerGridlines />
      <BackgroundGridlines />
      <AppAppBar />
      <Hero />
      <Box>
        <Features />
        <Divider />
        <Testimonials />
        <Divider />
        <Stats />
        <Divider />
        <Pricing />
        <Divider />
        <FAQ />
        <Divider />
        <Footer />
      </Box>
    </Box>
  );
}

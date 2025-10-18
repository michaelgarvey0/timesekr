'use client';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import * as React from 'react';
import { Logo } from '../../../components/Logo';
function AppAppBar() {
    const [open, setOpen] = React.useState(false);
    const [hasScrolled, setHasScrolled] = React.useState(false);
    // add a class after scroll so that the border appears when we are more than a pixel away from the top
    const { scrollY } = useScroll();
    useMotionValueEvent(scrollY, 'change', (latest) => {
        setHasScrolled(latest > 1);
    });
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };
    const scrollToSection = (sectionId) => {
        const sectionElement = document.getElementById(sectionId);
        const offset = 128;
        if (sectionElement) {
            const targetScroll = sectionElement.offsetTop - offset;
            sectionElement.scrollIntoView({ behavior: 'smooth' });
            window.scrollTo({
                top: targetScroll,
                behavior: 'smooth',
            });
            setOpen(false);
        }
    };
    return (<AppBar position="fixed" sx={{
            backgroundColor: 'transparent',
            borderBottom: 'none',
            transition: 'background-color 0.3s, backdrop-filter 0.3s, border-bottom 0.3s',
            ...(hasScrolled && {
                backgroundColor: (theme) => `rgba(255, 255, 255, 0.5)`,
                backdropFilter: 'blur(12px)',
                borderBottom: (theme) => `0.5px solid ${theme.palette.gray['200']}`,
            }),
        }}>
      <Toolbar variant="regular" sx={(theme) => ({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            maxHeight: 36,
        })}>
        <Box sx={{
            flexGrow: 1,
            display: 'flex',
            gap: 4,
            alignItems: 'center',
            px: 0,
        }}>
          <Logo width={180}/>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, transform: 'translateY(2px)' }}>
            <MenuItem onClick={() => scrollToSection('features')}>
              <Typography sx={{
            color: 'gray.500',
            fontSize: 'sm',
        }}>
                Features
              </Typography>
            </MenuItem>
            <MenuItem onClick={() => scrollToSection('testimonials')}>
              <Typography sx={{
            color: 'gray.500',
            fontSize: 'sm',
        }}>
                Testimonials
              </Typography>
            </MenuItem>
            <MenuItem onClick={() => scrollToSection('highlights')}>
              <Typography sx={{
            color: 'gray.500',
            fontSize: 'sm',
        }}>
                Highlights
              </Typography>
            </MenuItem>
            <MenuItem onClick={() => scrollToSection('pricing')}>
              <Typography sx={{
            color: 'gray.500',
            fontSize: 'sm',
        }}>
                Pricing
              </Typography>
            </MenuItem>
            <MenuItem onClick={() => scrollToSection('faq')}>
              <Typography sx={{
            color: 'gray.500',
            fontSize: 'sm',
        }}>
                FAQ
              </Typography>
            </MenuItem>
          </Box>
        </Box>
        <Box sx={{
            display: { xs: 'none', md: 'flex' },
            gap: 1,
            alignItems: 'center',
        }}>
          <Button color="primary" variant="text" component="a" href="/material-ui/getting-started/templates/sign-in/" target="_blank">
            Sign in
          </Button>
          <Button color="primary" variant="contained" component="a" href="/material-ui/getting-started/templates/sign-up/" target="_blank">
            Sign up
          </Button>
        </Box>
        <Box sx={{ display: { sm: '', md: 'none' } }}>
          <Button variant="text" color="primary" aria-label="menu" onClick={toggleDrawer(true)} sx={{ minWidth: '30px', p: '4px' }}>
            <MenuIcon />
          </Button>
          <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
            <Box sx={{
            minWidth: '60dvw',
            p: 2,
            backgroundColor: 'background.paper',
            flexGrow: 1,
        }}>
              <MenuItem onClick={() => scrollToSection('features')}>Features</MenuItem>
              <MenuItem onClick={() => scrollToSection('testimonials')}>Testimonials</MenuItem>
              <MenuItem onClick={() => scrollToSection('highlights')}>Highlights</MenuItem>
              <MenuItem onClick={() => scrollToSection('pricing')}>Pricing</MenuItem>
              <MenuItem onClick={() => scrollToSection('faq')}>FAQ</MenuItem>
              <MenuItem>
                <Button color="primary" variant="contained" component="a" href="/material-ui/getting-started/templates/sign-up/" target="_blank" sx={{ width: '100%' }}>
                  Sign up
                </Button>
              </MenuItem>
              <MenuItem>
                <Button color="primary" variant="outlined" component="a" href="/material-ui/getting-started/templates/sign-in/" target="_blank" sx={{ width: '100%' }}>
                  Sign in
                </Button>
              </MenuItem>
            </Box>
          </Drawer>
        </Box>
      </Toolbar>
    </AppBar>);
}
export default AppAppBar;

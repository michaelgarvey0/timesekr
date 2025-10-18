import * as React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  Avatar,
} from '@mui/material';
import { FiMenu } from 'react-icons/fi';
import { HiOutlineBell } from 'react-icons/hi';
// mock data
const links = ['Dashboard', 'Projects', 'Settings'];
const Logo = () => (
  <Box
    sx={{
      fontSize: '2xl',
      fontWeight: 800,
      textDecoration: 'none',
      color: 'gray.700',
    }}
  >
    ❍ UI Kit
  </Box>
);
// centered logo nav
export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position='static'
      sx={{
        bgcolor: 'background.paper',
        py: 1,
      }}
    >
      <Container>
        <Toolbar variant='dense' disableGutters>
          <Box
            sx={{
              display: { xs: 'none', md: 'grid' },
              gridTemplateColumns: '1fr auto 1fr',
              gap: 1,
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              {links.map(link => (
                <Button
                  component='a'
                  href='#'
                  key={link}
                  onClick={handleCloseNavMenu}
                  sx={{ color: 'gray.600', fontWeight: 500 }}
                >
                  {link}
                </Button>
              ))}
            </Box>
            <Logo />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: 1,
              }}
            >
              <IconButton size='medium'>
                <HiOutlineBell size={24} />
              </IconButton>
              <Avatar
                src='https://images.unsplash.com/photo-1539571696357-5a69c17a67c6'
                sx={{
                  height: 36,
                  width: 36,
                }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'grid', md: 'none' },
              gridTemplateColumns: '40px auto 40px',
              width: '100%',
              gap: 0.5,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <IconButton
              size='medium'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
            >
              <FiMenu />
            </IconButton>
            <Logo />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: 0.5,
              }}
            >
              <Avatar
                src='https://images.unsplash.com/photo-1539571696357-5a69c17a67c6'
                sx={{
                  height: 30,
                  width: 30,
                }}
              />
            </Box>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
              disablePortal={true}
            >
              {links.map(link => (
                <MenuItem key={link} onClick={handleCloseNavMenu}>
                  <Typography textAlign='center'>{link}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

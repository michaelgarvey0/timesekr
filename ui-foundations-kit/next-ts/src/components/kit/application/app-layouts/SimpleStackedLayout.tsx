'use client'
import * as React from 'react';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from '@mui/material';
import { TbBell, TbMenu } from 'react-icons/tb';
// mock data
const links = ['Docs', 'Support', 'Changelog'];
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
// stacked layout with navbar + avatar
export default function SimpleStackedLayout() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const [activeTab, setActiveTab] = React.useState('overview');
  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <AppBar
        position='static'
        sx={{
          bgcolor: 'background.paper',
          pt: 1,
          borderWidth: 0,
        }}
      >
        <Container>
          <Toolbar variant='dense' disableGutters>
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
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
                <Logo />
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
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <IconButton size='medium'>
                  <TbBell size={24} />
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
                <TbMenu />
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
      <Box
        sx={{
          display: 'flex',
          bgcolor: 'background.paper',
          borderBottomWidth: 1,
          borderBottomColor: 'gray.200',
          borderBottomStyle: 'solid',
        }}
      >
        <Container>
          <Tabs value={activeTab} onChange={handleChange}>
            <Tab label='Overview' value='overview' />
            <Tab label='Projects' value='projects' />
            <Tab label='Settings' value='settings' />
          </Tabs>
        </Container>
      </Box>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          py: 3,
          gap: 2,
          height: '100%',
        }}
      >
        <Typography
          variant='h1'
          sx={{
            fontSize: '2xl',
          }}
        >
          Dashboard
        </Typography>
        <Box
          sx={{
            borderWidth: 2,
            borderStyle: 'dashed',
            borderRadius: 1,
            borderColor: 'gray.200',
            height: '100%',
            flex: 1,
          }}
        />
      </Container>
    </Box>
  );
}

'use client';
import {
  Box,
  Button,
  IconButton,
  Link,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import * as React from 'react';
import { FrameworkLink } from '../framework/FrameworkLink';
import { TbBook, TbDashboard, TbLogin, TbMenu } from 'react-icons/tb';
import { Logo } from '../components/Logo';
export function Header() {
  const theme = useTheme();
  const matchesSmBreakpoint = useMediaQuery(theme.breakpoints.up('sm'));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const showMenu = !matchesSmBreakpoint;
  return (
    <Box
      component="header"
      sx={{
        position: 'relative',
        zIndex: 50,
        fontSize: '0.875rem',
        lineHeight: ['1.25rem', '1.5rem'],
        fontWeight: 600,
        width: '100%',
        px: { xs: 0, sm: 2 },
      }}
    >
      <Box aria-label="Global" component="nav">
        <Box
          component="div"
          sx={{
            display: 'flex',
            position: 'relative',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box to="/" component={FrameworkLink}>
            <Logo width={175} />
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <a
              href="https://docs.uifoundations.com"
              target="_blank"
              style={{
                textDecoration: 'none',
              }}
            >
              <Button
                color="secondary"
                sx={{
                  fontWeight: 600,
                  display: { xs: 'none', sm: 'flex' },
                }}
              >
                Docs
              </Button>
            </a>
            <>
              <IconButton
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                size="medium"
                sx={{
                  display: showMenu ? 'flex' : 'none',
                }}
              >
                <TbMenu />
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
                PaperProps={{
                  sx: {
                    borderRadius: 2,
                  },
                }}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <a
                  href="https://docs.uifoundations.com"
                  target="_blank"
                  style={{
                    textDecoration: 'none',
                  }}
                >
                  <MenuItem
                    component="a"
                    onClick={() => {
                      handleClose();
                    }}
                    sx={{
                      display: { xs: 'flex', sm: 'none' },
                      alignItems: 'center',
                      gap: 1.5,
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'primary.100',
                        color: 'primary.500',
                        borderRadius: 1,
                        p: 1,
                        ml: -1,
                      }}
                    >
                      <TbBook />
                    </Box>
                    Docs
                  </MenuItem>
                </a>
                <FrameworkLink
                  to="/dashboard"
                  style={{
                    textDecoration: 'none',
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      handleClose();
                    }}
                    sx={{
                      display: { xs: 'flex', sm: 'none' },
                      alignItems: 'center',
                      gap: 1.5,
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'primary.100',
                        color: 'primary.500',
                        borderRadius: 1,
                        p: 1,
                        ml: -1,
                      }}
                    >
                      <TbDashboard />
                    </Box>
                    Dashboard
                  </MenuItem>
                </FrameworkLink>
                {
                  <Box>
                    <Link
                      href="/login"
                      sx={{
                        textDecoration: 'none',
                      }}
                    >
                      <MenuItem
                        component="a"
                        onClick={() => {
                          handleClose();
                        }}
                        sx={{
                          display: { xs: 'flex', sm: 'none' },
                          alignItems: 'center',
                          gap: 1.5,
                          my: -0.5,
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: 'primary.100',
                            color: 'primary.500',
                            borderRadius: 1,
                            p: 1,
                            ml: -1,
                          }}
                        >
                          <TbLogin />
                        </Box>
                        Sign In
                      </MenuItem>
                    </Link>
                    <Box
                      sx={{
                        p: 1,
                      }}
                    ></Box>
                  </Box>
                }
              </Menu>
            </>
            <FrameworkLink
              to="/login"
              style={{
                textDecoration: 'none',
              }}
            >
              <Button
                color="secondary"
                sx={{
                  fontWeight: 600,
                  display: { xs: 'none', sm: 'flex' },
                }}
              >
                Sign in
              </Button>
            </FrameworkLink>
            <FrameworkLink
              to="/dashboard/home"
              style={{
                textDecoration: 'none',
              }}
            >
              <Button
                color="secondary"
                sx={{
                  fontWeight: 600,
                  display: { xs: 'none', sm: 'flex' },
                }}
              >
                Dashboard
              </Button>
            </FrameworkLink>
            <Button
              href="https://mui.com/store/items/ui-foundations-kit-saas-admin-dashboard-template/"
              component="a"
              target="_blank"
              variant="contained"
              sx={{
                display: {
                  xs: 'none',
                  sm: 'flex',
                },
              }}
            >
              Buy Template
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

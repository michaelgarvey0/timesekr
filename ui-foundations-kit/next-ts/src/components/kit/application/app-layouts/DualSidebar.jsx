import * as React from 'react';
import { Box, List, ListItem, Tooltip, Typography } from '@mui/material';
import {
  HiLockClosed,
  HiOutlineTag,
  HiOutlineInboxIn,
  HiOutlineUserGroup,
  HiOutlineChartBar,
  HiPaperClip,
  HiMenuAlt4,
} from 'react-icons/hi';
import { FiHome, FiLayout } from 'react-icons/fi';
import { TbDashboard, TbPaint, TbSettings } from 'react-icons/tb';
const SM_SIDEBAR_WIDTH = 64;
const SIDEBAR_WIDTH = 250;
const SECONDARY_SIDEBAR_WIDTH = 200;
// sidebar with a primary and secondary column
function Sidebar() {
  return (
    <Box
      sx={{
        display: { xs: 'none', sm: 'flex' },
        flexDirection: 'column',
        height: '100%',
        maxHeight: '100vh',
        width: '100%',
        bgcolor: 'primary.600',
        borderRightWidth: 1,
        borderRightStyle: 'solid',
        borderRightColor: 'primary.400',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          width: { xs: SM_SIDEBAR_WIDTH, md: SIDEBAR_WIDTH },
          height: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            px: 1,
            pt: 0.5,
            mx: 1.5,
            my: 1,
          }}
        >
          <Logo />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            flex: 1,
          }}
        >
          <List
            sx={{
              pt: 0.5,
              pb: 0,
              borderRightWidth: 1,
              borderRightStyle: 'solid',
              borderRightColor: 'primary.400',
            }}
          >
            <SidebarItem
              iconOnlyWhenSmall
              href={undefined}
              title="Home"
              icon={<FiHome size={ICON_SIZE} />}
              active={true}
            />
            <SidebarItem
              iconOnlyWhenSmall
              href={undefined}
              title="Products"
              icon={<HiOutlineTag size={ICON_SIZE} />}
            />
            <SidebarItem
              iconOnlyWhenSmall
              href={undefined}
              title="Orders"
              icon={<HiOutlineInboxIn size={ICON_SIZE} />}
              rightAdornment={
                <Box
                  sx={{
                    fontSize: 'xs',
                    color: 'white',
                    bgcolor: 'primary.500',
                    borderRadius: 999,
                    px: 0.75,
                    py: 0.25,
                  }}
                >
                  15
                </Box>
              }
            />
            <SidebarItem
              iconOnlyWhenSmall
              href={undefined}
              title="Customers"
              icon={<HiOutlineUserGroup size={ICON_SIZE} />}
            />
            <SidebarItem
              iconOnlyWhenSmall
              href={undefined}
              title="Analytics"
              icon={<HiOutlineChartBar size={ICON_SIZE} />}
            />
            <SidebarItem iconOnlyWhenSmall href={undefined} title="Files" icon={<HiPaperClip />} />
          </List>
        </Box>
      </Box>
    </Box>
  );
}
function SecondarySidebar() {
  return (
    <Box
      sx={{
        display: { xs: 'none', sm: 'flex' },
        flexDirection: 'column',
        height: '100%',
        maxHeight: '100vh',
        width: '100%',
        bgcolor: 'primary.500',
        borderRight: 1,
        borderColor: 'primary.300',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          width: SECONDARY_SIDEBAR_WIDTH,
        }}
      >
        <Box
          sx={{
            color: 'background.paper',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            px: 1,
            pt: 0.5,
            m: 1,
            fontWeight: 600,
          }}
        >
          Home
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            flex: 1,
          }}
        >
          <List
            sx={{
              pt: 0.5,
              pb: 0,
              borderRightWidth: 1,
              borderRightStyle: 'solid',
              borderRightColor: 'primary.300',
            }}
          >
            <SidebarItem
              href={undefined}
              title="Dashboard"
              icon={<FiLayout size={ICON_SIZE} />}
              active={true}
            />
            <SidebarItem href={undefined} title="Metrics" icon={<TbDashboard size={ICON_SIZE} />} />
            <SidebarItem
              href={undefined}
              title="Customization"
              icon={<TbPaint size={ICON_SIZE} />}
            />
            <SidebarItem href={undefined} title="Settings" icon={<TbSettings size={ICON_SIZE} />} />
          </List>
        </Box>
      </Box>
    </Box>
  );
}
// items in the sidebar
function SidebarItem({
  href,
  active,
  icon: Icon,
  rightAdornment: RightAdornment,
  title,
  deemphasized,
  iconOnlyWhenSmall,
  sx,
  ...rest
}) {
  const itemIsActive = active;
  return (
    <ListItem
      disableGutters
      sx={{
        display: 'flex',
        py: 0.25,
        px: 1.5,
        mb: 0,
        '.MuiTooltip-tooltip': {
          display: iconOnlyWhenSmall ? { xs: 'none', sm: 'flex', md: 'none' } : 'flex',
        },
        '&:hover': {
          bgcolor: 'primary.500',
          cursor: 'pointer',
        },
        ...(itemIsActive && {
          bgcolor: 'primary.500',
        }),
        ...sx,
      }}
      {...rest}
    >
      <Tooltip
        title={title}
        placement="right"
        PopperProps={{
          disablePortal: true,
        }}
      >
        <Box
          href={href}
          component="a"
          color="info"
          sx={{
            display: 'flex',
            width: '100%',
            textDecoration: 'none',
            borderRadius: 2,
            alignItems: 'center',
            justifyContent: 'flex-start',
            letterSpacing: 0,
            py: 0.5,
            px: 1.25,
            textTransform: 'none',
            color: 'primary.50',
            ...(deemphasized && {
              color: 'primary.400',
            }),
            '&:hover': {
              bgcolor: 'transparent',
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '20px',
              height: '20px',
              mr: 1,
            }}
          >
            {Icon && Icon}
          </Box>
          <Box
            sx={{
              display: iconOnlyWhenSmall ? { xs: 'none', sm: 'none', md: 'flex' } : 'flex',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
              textOverflow: 'ellipsis',
              fontSize: 'sm',
              fontWeight: itemIsActive ? '600' : 'medium',
              lineHeight: 1,
            }}
          >
            {title}
            {RightAdornment && RightAdornment}
          </Box>
          {deemphasized && (
            <Box
              component="span"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'gray.300',
                height: 12,
              }}
            >
              <HiLockClosed size={12} />
            </Box>
          )}
        </Box>
      </Tooltip>
    </ListItem>
  );
}
// bottom menu to show when on a mobile view
function MobileNav() {
  return (
    <Box
      component="nav"
      sx={{
        display: { xs: 'flex', sm: 'none' },
        position: 'fixed',
        width: '100%',
        bottom: 0,
        zIndex: 5,
        bgcolor: 'background.paper',
        borderTopColor: 'gray.300',
        borderTopWidth: 1,
        borderTopStyle: 'solid',
        paddingBottom: `env(safe-area-inset-bottom, 0.5rem)`,
        displayPrint: 'none',
      }}
    >
      <Box
        component="ul"
        sx={{
          listStyle: 'none',
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          marginBlock: 0,
          paddingInline: 0,
          width: '100%',
          '& > li:nth-child(n+2)': {
            borderLeftColor: 'gray.300',
            borderLeftWidth: 1,
            borderLeftStyle: 'solid',
          },
        }}
      >
        <MobileNavItem href={undefined}>
          <FiHome size={24} color="currentColor" />
        </MobileNavItem>
        <MobileNavItem href={undefined}>
          <HiOutlineTag size={24} color="currentColor" />
        </MobileNavItem>
        <MobileNavItem href={undefined}>
          <HiOutlineInboxIn size={24} color="currentColor" />
        </MobileNavItem>
        <MobileNavItem href={undefined}>
          <HiOutlineUserGroup size={24} color="currentColor" />
        </MobileNavItem>
        <MobileNavItem href={undefined}>
          <HiMenuAlt4 size={24} color="currentColor" />
        </MobileNavItem>
      </Box>
    </Box>
  );
}
function MobileNavItem({ active, href, children }) {
  return (
    <Box
      component="li"
      sx={{
        color: 'gray.600',
        width: '100%',
      }}
    >
      <Box
        href={href}
        component="a"
        sx={{
          color: active ? 'primary.600' : 'gray.600',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          py: 1,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
// all components that are used in the sidebar
export default function Example() {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: `${SM_SIDEBAR_WIDTH}px ${SECONDARY_SIDEBAR_WIDTH}px 1fr`,
          md: `${SIDEBAR_WIDTH}px ${SECONDARY_SIDEBAR_WIDTH}px 1fr`,
        },
        width: '100%',
        height: '100%',
        minHeight: '100vh',
      }}
    >
      <MobileNav />
      <Sidebar />
      <SecondarySidebar />
      <Box
        sx={{
          p: { xs: 2, sm: 4 },
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography variant="h1">Dashboard</Typography>
        <Box
          sx={{
            borderWidth: 2,
            borderStyle: 'dashed',
            borderRadius: 1,
            borderColor: 'gray.200',
            height: '100%',
          }}
        />
      </Box>
    </Box>
  );
}
const ICON_SIZE = 18;
const Logo = () => (
  <Box
    sx={{
      fontSize: '2xl',
      fontWeight: 800,
      textDecoration: 'none',
      color: 'primary.100',
    }}
  >
    ❍{' '}
    <Box
      component="span"
      sx={{
        display: { xs: 'none', md: 'inline' },
      }}
    >
      UI Kit
    </Box>
  </Box>
);

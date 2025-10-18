'use client'
import * as React from 'react';
import { Box, Divider, List, ListItem, Typography } from '@mui/material';
import {
  HiOutlineBeaker,
  HiLockClosed,
  HiOutlineTag,
  HiOutlineInboxIn,
  HiOutlineUserGroup,
  HiOutlineChartBar,
  HiPaperClip,
  HiMenuAlt4,
} from 'react-icons/hi';
import { FiHome } from 'react-icons/fi';
const SIDEBAR_WIDTH = 250;
const ICON_SIZE = 18;
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

function Sidebar() {
  return (
    <Box
      sx={{
        display: { xs: 'none', sm: 'flex' },
        flexDirection: 'column',
        height: '100%',
        maxHeight: '100vh',
        width: SIDEBAR_WIDTH,
        bgcolor: 'gray.100',
        borderRight: 1,
        borderColor: 'gray.200',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          width: SIDEBAR_WIDTH,
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
              borderRightColor: 'gray.200',
            }}
          >
            <SidebarItem
              href={undefined}
              title='Home'
              icon={<FiHome size={ICON_SIZE} />}
              active={true}
            />
            <SidebarDivider />
            <SidebarItem
              href={undefined}
              title='Products'
              icon={<HiOutlineTag size={ICON_SIZE} />}
            />
            <SidebarItem
              href={undefined}
              title='Orders'
              icon={<HiOutlineInboxIn size={ICON_SIZE} />}
            />
            <SidebarItem
              href={undefined}
              title='Customers'
              icon={<HiOutlineUserGroup size={ICON_SIZE} />}
            />
            <SidebarDivider />
            <SidebarItem
              href={undefined}
              title='Analytics'
              icon={<HiOutlineChartBar size={ICON_SIZE} />}
            />
            <SidebarItem
              href={undefined}
              title='Files'
              icon={<HiPaperClip />}
            />
            <SidebarItem
              href={undefined}
              title='Experimental Features'
              icon={<HiOutlineBeaker />}
              deemphasized={true}
            />
          </List>
        </Box>
      </Box>
    </Box>
  );
}

function SidebarDivider() {
  return (
    <Divider
      light
      sx={{
        my: 1,
        mx: 3,
        borderColor: 'gray.200',
      }}
    />
  );
}

function SidebarItem({
  href,
  active,
  icon: Icon,
  rightAdornment: RightAdornment,
  title,
  deemphasized,
  sx,
  ...rest
}: {
  href?: string;
  active?: boolean;
  title: string;
  icon?: React.ReactNode;
  rightAdornment?: React.ReactNode;
  deemphasized?: boolean;
  sx?: any;
}) {
  const itemIsActive = active;

  return (
    <ListItem
      disableGutters
      sx={{
        display: 'flex',
        py: 0,
        px: 1.5,
        mb: 0,
        '&:hover': {
          bgcolor: 'gray.200',
          cursor: 'pointer',
        },
        ...(itemIsActive && {
          bgcolor: 'gray.200',
        }),
        ...sx,
      }}
      {...rest}
    >
      <Box
        href={href}
        component='a'
        color='info'
        sx={{
          textDecoration: 'none',
          borderRadius: 2,
          alignItems: 'center',
          justifyContent: 'flex-start',
          letterSpacing: 0,
          py: 0.5,
          px: 1.25,
          textTransform: 'none',
          display: 'flex',
          width: '100%',
          color: 'gray.500',
          ...(deemphasized && {
            color: 'gray.400',
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
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
            textOverflow: 'ellipsis',
            fontSize: 'sm',
            fontWeight: itemIsActive ? '600' : 'medium',
          }}
        >
          {title}
          {RightAdornment && RightAdornment}
        </Box>
        {deemphasized && (
          <Box
            component='span'
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
    </ListItem>
  );
}

function MobileNav() {
  return (
    <Box
      component='nav'
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
        component='ul'
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
          <FiHome size={24} color='currentColor' />
        </MobileNavItem>
        <MobileNavItem href={undefined}>
          <HiOutlineTag size={24} color='currentColor' />
        </MobileNavItem>
        <MobileNavItem href={undefined}>
          <HiOutlineInboxIn size={24} color='currentColor' />
        </MobileNavItem>
        <MobileNavItem href={undefined}>
          <HiOutlineUserGroup size={24} color='currentColor' />
        </MobileNavItem>
        <MobileNavItem href={undefined}>
          <HiMenuAlt4 size={24} color='currentColor' />
        </MobileNavItem>
      </Box>
    </Box>
  );
}

function MobileNavItem({
  active,
  href,
  children,
}: {
  active?: boolean;
  href?: string;
  children: React.ReactNode;
}) {
  return (
    <Box
      component='li'
      sx={{
        color: 'gray.600',
        width: '100%',
      }}
    >
      <Box
        href={href}
        component='a'
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

export default function Example() {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: `${SIDEBAR_WIDTH}px 1fr` },
        width: '100%',
        height: '100%',
      }}
    >
      <Sidebar />
      <MobileNav />
      <Box
        sx={{
          p: { xs: 2, sm: 4 },
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          minHeight: '100vh',
        }}
      >
        <Typography variant='h1'>Dashboard</Typography>
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

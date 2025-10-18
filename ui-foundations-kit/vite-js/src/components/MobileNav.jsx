import { Box } from '@mui/material';
import * as React from 'react';
import { FiHome } from 'react-icons/fi';
import { TbCalendar, TbList, TbMicrophone2, TbTicket } from 'react-icons/tb';
export function MobileNav() {
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
          '& > li:nth-of-type(n+2)': {
            borderLeftColor: 'gray.300',
            borderLeftWidth: 1,
            borderLeftStyle: 'solid',
          },
        }}
      >
        <MobileNavItem href={'/dashboard/home'} name="home">
          <FiHome size={24} color="currentColor" />
        </MobileNavItem>
        <MobileNavItem href={'/dashboard/orders'} name="orders">
          <TbTicket size={24} color="currentColor" />
        </MobileNavItem>
        <MobileNavItem href={'/dashboard/events'} name="events">
          <TbCalendar size={24} color="currentColor" />
        </MobileNavItem>
        <MobileNavItem href={'/dashboard/speakers'} name="speakers">
          <TbMicrophone2 size={24} color="currentColor" />
        </MobileNavItem>
        <MobileNavItem href={'/dashboard/directory'} name="directory">
          <TbList size={24} color="currentColor" />
        </MobileNavItem>
      </Box>
    </Box>
  );
}
function MobileNavItem({ active, href, children, name }) {
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
        aria-label={name}
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

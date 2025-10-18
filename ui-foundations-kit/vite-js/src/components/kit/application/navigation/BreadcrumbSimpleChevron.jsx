import * as React from 'react';
import { Box } from '@mui/material';
import { HiChevronRight } from 'react-icons/hi';
// Render labels with links and an icon delimiter
export default function BreadcrumSimpleChevron({
  items = [
    {
      label: 'Home',
      href: '#',
    },
    {
      label: 'Workspaces',
      href: '#',
    },
    {
      label: 'My First Workspace',
    },
  ],
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 1,
        fontSize: 'sm',
        fontWeight: 500,
        color: 'gray.500',
      }}
    >
      {items.map((item, index) => {
        return (
          <Box
            component="a"
            href={item.href}
            key={index}
            sx={{
              color: 'gray.500',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 1,
              textDecoration: 'none',
            }}
          >
            {item.label}
            {index !== items.length - 1 && <HiChevronRight />}
          </Box>
        );
      })}
    </Box>
  );
}

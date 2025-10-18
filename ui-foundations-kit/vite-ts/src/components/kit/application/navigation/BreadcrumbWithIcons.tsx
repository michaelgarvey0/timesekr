import * as React from 'react';
import { Box } from '@mui/material';
import { HiChevronRight, HiHome } from 'react-icons/hi';
// Render labels with links and an icon delimiter
export default function BreadcrumSimpleChevron({
  items = [
    {
      icon: <HiHome />,
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
}: {
  items: {
    label: string;
    href?: string;
    icon?: React.ReactNode;
  }[];
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
      }}
    >
      {items.map((item, index) => {
        return (
          <Box
            component='a'
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
            {item.icon && item.icon}
            {item.label}
            {index !== items.length - 1 && <HiChevronRight />}
          </Box>
        );
      })}
    </Box>
  );
}

'use client'
import * as React from 'react';
import { Box } from '@mui/material';
// Render labels with links and a slash delimiter
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
}: {
  items: {
    label: string;
    href?: string;
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
        color: 'gray.500',
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
            {item.label}
            {index !== items.length - 1 && <Box>/</Box>}
          </Box>
        );
      })}
    </Box>
  );
}

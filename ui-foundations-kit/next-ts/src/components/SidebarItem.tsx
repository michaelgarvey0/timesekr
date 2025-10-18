'use client'
import { Box, ListItem } from '@mui/material';
import * as React from 'react';
import { HiLockClosed } from 'react-icons/hi';
import { usePathname } from '~/framework/usePathname';

export function SidebarItem({
  href,
  target,
  icon: Icon,
  rightAdornment: RightAdornment,
  title,
  deemphasized,
  sx,
  ...rest
}: {
  href: string;
  target?: string;
  title: string;
  icon?: React.ReactNode;
  rightAdornment?: React.ReactNode;
  deemphasized?: boolean;
  sx?: any;
}) {
  const pathname = usePathname();
  const itemIsActive = pathname?.startsWith(href);

  return (
    <ListItem
      disableGutters
      sx={{
        display: 'flex',
        py: 0,
        px: 1.5,
        mb: 0,
        ...sx,
      }}
      {...rest}
    >
      <Box
        href={href}
        component="a"
        target={target}
        color="info"
        sx={{
          borderRadius: 1,
          alignItems: 'center',
          justifyContent: 'flex-start',
          letterSpacing: 0,
          py: 0.5,
          px: 1.25,
          textDecoration: 'none',
          textTransform: 'none',
          display: 'flex',
          gap: 1.5,
          width: '100%',
          color: itemIsActive ? 'gray.800' : 'gray.500',
          ...(deemphasized && {
            color: 'gray.500',
            pointerEvents: 'none',
          }),
          '&::before': {
            content: "''",
            position: 'absolute',
            top: 3,
            bottom: 3,
            left: -3,
            width: 6,
            backgroundColor: itemIsActive ? 'gray.700' : 'transparent',
            borderRadius: 2,
          },
          '&:hover': {
            bgcolor: itemIsActive ? 'hsl(213deg 94% 18% / 5%)' : 'hsl(210deg 88% 21% / 3%)',
            cursor: 'pointer',
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
    </ListItem>
  );
}

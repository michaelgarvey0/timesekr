'use client'
import Box from '@mui/material/Box';
import React from 'react';

import { TbArrowUp } from 'react-icons/tb';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/Card';

export function ChartCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  // watch browser width to debounce and rerender so that the chart reflows
  const [key, setKey] = React.useState(0);
  React.useEffect(
    () => {
      const handleResize = () => {
        setKey((prev) => prev + 1);
      };
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-de
    [],
  );

  return (
    <Card customSx={{ height: 350 }} key={key}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent
        customSx={{
          display: 'flex',
          height: '100%',
        }}
      >
        {children}
      </CardContent>
      <CardFooter>
        <Box sx={{ display: 'flex', width: '100%', alignItems: 'start', gap: 1, fontSize: 'sm' }}>
          <Box sx={{ display: 'grid', gap: 1 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                fontWeight: 500,
              }}
            >
              <TbArrowUp />
              5.2% this month
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                lineHeight: 'normal',
                color: 'text.secondary',
              }}
            >
              Last 90 days
            </Box>
          </Box>
        </Box>
      </CardFooter>
    </Card>
  );
}

import { Box, Typography } from '@mui/material';
import * as React from 'react';
import {
  TbCube3dSphere,
  TbDeviceMobile,
  TbLayout,
  TbPalette,
} from 'react-icons/tb';
// features with tighter spacing
export default function FeaturesSmallColumn({
  features = [
    {
      icon: <TbCube3dSphere />,
      title: 'Beautiful default theme',
      description:
        'With harmonic scales and high-level utility abstractions like Tailwind and Styled System.',
    },
    {
      icon: <TbDeviceMobile />,
      title: 'Fully responsive',
      description:
        'With mobile sizes ergonically built with the responsive object syntax.',
    },
    {
      icon: <TbPalette />,
      title: 'Completely themeable',
      description:
        'With TypeScript defined theme tokens, variants, and scales.',
    },
    {
      icon: <TbLayout />,
      title: 'Modern techniques',
      description: 'Grid and Flex native, limited margins and padding.',
    },
  ],
}: {
  features: FeatureProps[];
}) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          sm: 'repeat(2,minmax(0,1fr))',
          md: 'repeat(4,minmax(0,1fr))',
        },
        gap: 4,
        px: { xs: 0, sm: 2 },
        py: 6,
      }}
    >
      {features.map((feature: FeatureProps) => {
        return (
          <Feature
            key={feature.title}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        );
      })}
    </Box>
  );
}
function Feature({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        fontSize: 'md',
        lineHeight: 1.5,
        gap: 1,
      }}
    >
      <Box>{icon}</Box>
      <Typography
        sx={{
          fontWeight: 600,
        }}
      >
        {title}
      </Typography>
      {description}
    </Box>
  );
}
type FeatureProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

'use client'
import * as React from 'react';

import { Box, Stack } from '@mui/material';

export const welcomeToUiFoundationsKit = [
  {
    selector: 'body',
    content: (
      <Stack spacing={1.5}>
        <Box
          sx={{
            fontWeight: 'bold',
          }}
        >{`Welcome to UI Foundations Kit!`}</Box>
        <Box>
          {`To get oriented with the capabilities of this template and its components, you can continue this walkthrough.`}
        </Box>
        <Box>{`You can continue by clicking the next arrow, or using your arrow keys on the keyboard. This tour can easily be added to any of your own features with a convenient API as well!`}</Box>
      </Stack>
    ),
  },
  {
    selector: "[data-tour='sidebar']",
    content: (
      <Stack spacing={1.5}>
        <Box>
          {`You can see all example pages in the left hand sidebar, this sidebar has components that handle things like active state for you.`}
        </Box>
        <Box>{`Exploring these pages will give you a good summary of whats available throughout this starter kit.`}</Box>
      </Stack>
    ),
  },
  {
    selector: '#command-bar',
    content: (
      <Stack spacing={1.5}>
        <Box>
          {`A command launcher is already included to give you quick shortcuts around the app, that you can customize yourself.`}
        </Box>
        <Box>
          Give it a try with <kbd>⌘+K</kbd>!
        </Box>
      </Stack>
    ),
  },
  {
    selector: 'body',
    content: (
      <Stack spacing={1.5}>
        <Box>
          {`This starter kit uses the UI Foundations theme, which is honed to look visually distinct from Material Design. It instead focuses on a more modern SaaS focused design, with smaller margins, sharper edges, and a clearer palette that emphasizes more muted grays over flashy marketing colors.`}
        </Box>
        <Box>
          This means default MUI components like <code>{`<Button />`}</code> and{' '}
          <code>{`<Menu />`}</code> that you import and use will automatically look more like
          products you might be used to like Linear or Vercel.
        </Box>
      </Stack>
    ),
  },
  {
    selector: "[data-tour='page-container']",
    content: (
      <Stack spacing={1.5}>
        <Box>
          The kit contains many defined components useful for SaaS apps. All pages in the starter
          are rendered within the <code>{`<PageContainer />`}</code> component which handles
          padding, spacing, and layout for you on various screen sizes.
        </Box>
      </Stack>
    ),
  },
  {
    selector: "[data-tour='dashboard-header']",
    content: (
      <Stack spacing={1.5}>
        <Box>
          {`You'll see other components like this Dashboard Header component re-used. The Dashboard Header has props for adding new functionality and custom UI elements.`}
        </Box>
      </Stack>
    ),
  },
  {
    selector: "[data-tour='home-charts']",
    content: (
      <Stack spacing={1.5}>
        <Box>
          In addition to newly built layout and helper components, all the native built-in MUI
          components like <code>Charts</code>, <code>Selects</code>, and <code>Autocompletes</code>{' '}
          are also available and in some cases composed together to create Chart compositions or
          other sophisticated tools.
        </Box>
      </Stack>
    ),
  },
  {
    selector: "[data-tour='home-table']",
    content: (
      <Stack spacing={1.5}>
        <Box>
          {`Powerful components like the MUI data grid are re-skinned with nice defaults to help you build complex tables faster. There are even custom threshold filters included to help you build more complex data views.`}
        </Box>
      </Stack>
    ),
  },
  {
    selector: 'body',
    content: (
      <Stack spacing={1.5}>
        <Box>
          {`Explore around! There's a lot to interact with and drill into. You won't find many more comphrensive examples of how to use MUI in the real-world than this starter kit.`}
        </Box>
      </Stack>
    ),
  },
];

export interface TourDef {
  title: string;
  tourSteps: {
    selector: string;
    content: React.ReactNode;
  }[];
}

const TOURS_DATA = {
  welcome: {
    title: 'Welcome to Kit',
    tourSteps: welcomeToUiFoundationsKit,
    disableCloseOnClickMask: true,
  },
};

export type TourIds = keyof typeof TOURS_DATA;

export { TOURS_DATA };

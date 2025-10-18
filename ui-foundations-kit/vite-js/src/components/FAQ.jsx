import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Typography,
} from '@mui/material';
import * as React from 'react';
import { TbMinus, TbPlus } from 'react-icons/tb';
export function FAQ() {
  const [expanded, setExpanded] = React.useState('');
  const handleChange = (panel) => (_event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
      }}
    >
      <Box
        sx={{
          color: 'primary.500',
          fontWeight: 600,
          fontSize: 'sm',
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        }}
      >
        Get Answers
      </Box>
      <Typography
        variant="h2"
        sx={{
          fontSize: '3xl',
          fontWeight: 700,
        }}
      >
        Frequently Asked Questions
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: { xs: 0, md: 4 },
        }}
      >
        <FaqBlock
          data={[...FAQ_DATA].slice(0, 4)}
          expanded={expanded}
          handleChange={handleChange}
        />
        <Divider
          sx={{
            display: {
              xs: 'block',
              md: 'none',
            },
          }}
        />
        <FaqBlock
          data={[...FAQ_DATA].slice(4, 8)}
          expanded={expanded}
          handleChange={handleChange}
        />
      </Box>
    </Box>
  );
}
function FaqBlock({ data, expanded, handleChange }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        height: 'max-content',
      }}
    >
      {data.map((faq) => {
        return (
          <Accordion key={faq.id} expanded={expanded === faq.id} onChange={handleChange(faq.id)}>
            <AccordionSummary
              expandIcon={expanded === faq.id ? <TbMinus /> : <TbPlus />}
              aria-controls={`${faq.id}-content`}
              id={`${faq.id}-header`}
            >
              {faq.question}
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
}
const FAQ_DATA = [
  {
    id: '100',
    question: 'What do updates include?',
    answer: `
    Updates are released through the MUI Store and include new components, bug fixes, and updates to the theme.
  `,
  },
  {
    id: '200',
    question: 'What version of MUI is used?',
    answer: `
    All components are written with the MUI Material package, on version 5 or greater.
    Version 5 brought support for the sx prop and theming provided by the widely popular emotion package. Components will be kept up to date with the latest version of MUI to the best of our ability.
  `,
  },
  {
    id: '300',
    question: 'Why MUI? Why not _______ instead?',
    answer: `
    UI is the most popular React component library in the world.
    With as extensive of APIs provides, you can build extremely complex business applications with fewer lines of code.
    Other libraries offer great alternatives, as well as novel approaches to styling, but MUI has continued to provide the most sophisticated components like Autocompletes and Data Grids with a consistent API.
  `,
  },
  {
    id: '400',
    question: 'Do you use Joy UI in building these components?',
    answer: `
    For the time being, no. As the library matures we will reconsider that decision, but the current resources for Joy UI are less extensive and less tested.
    Because of the large collection of components that the MUI Material library provides, we support it first and foremost.
  `,
  },
  {
    id: '500',
    question: 'What does my purchase include?',
    answer: `
    Access includes all source code for the landing page, dashboard, authentication pages, as well as the MUI theme and funcational code in a React JavaScript or TypeScript app. All components, hooks, and layouts are also included. 
  `,
  },
  {
    id: '600',
    question: 'How can I request features?',
    answer: `
    Reach out to @uifoundatons on Twitter, or email our support through the MUI store. We are always looking for ways to improve the kit and make it more useful for developers.
  `,
  },
  {
    id: '700',
    question: 'Is there a free trial?',
    answer: `
    No, though we do offer a variety of free components that you can use to explore the various design decisions made for various components.
  `,
  },
  {
    id: '800',
    question: 'Is the UI Foundations Kit app built with this kit?',
    answer: `
    Yes, everything you see on this site is built with the same components that are offered through the UI kit, as well as the same theme. If you can see it on this domain, it is available with the full source code.
  `,
  },
];

import { Box, Divider, Typography } from '@mui/material';
import { formatReadableDate } from '../core/formatters';
import { FrameworkLink } from '../framework/FrameworkLink';
const TYPOGRAPHY_STYLES = {
  a: {
    color: 'gray.800',
    fontWeight: 500,
    textDecoration: 'undeline',
  },
  'ul, ol': {
    paddingLeft: 3.5,
  },
  li: {
    pl: 0.5,
    my: 1,
    '&:where(ul > li)::marker': {
      color: 'gray.200',
    },
    '&:where(ol > li)::marker': {
      color: 'gray.500',
    },
  },
  p: {
    fontSize: 'lg',
    lineHeight: 1.75,
    color: 'gray.800',
  },
  img: {
    maxWidth: '100%',
    borderRadius: 2,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'gray.200',
    mb: 2,
  },
  h2: {
    mt: 0,
    mb: 1,
    fontWeight: 700,
    fontSize: '2xl',
    lineHeight: 1.75,
  },
  h3: {
    mt: 0,
    mb: 1,
    fontWeight: 600,
    fontSize: 'lg',
    lineHeight: 1.6,
  },
  h4: {
    mt: 0,
    mb: 1,
    fontWeight: 600,
    fontSize: 'md',
    lineHeight: 1.5,
  },
};
export function ChangelogFeed({ entries }) {
  return (
    <>
      {entries.map((entry, index) => (
        <>
          <Box
            key={`${entry.date}-${index}`}
            component="section"
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 3fr' },
              gap: 2,
            }}
          >
            <ChangelogFeedDate date={entry.date} />
            <Box
              sx={{
                position: 'relative',
                pb: 12,
                maxWidth: '72ch',
              }}
            >
              <Box sx={TYPOGRAPHY_STYLES}>
                <Box
                  dangerouslySetInnerHTML={{
                    __html: entry.content,
                  }}
                />
              </Box>
            </Box>
          </Box>
          {/* every entry but the last one needs a horizontal divider */}
          {index < entries.length - 1 && (
            <Divider
              sx={{
                mb: 12,
                mx: 24,
              }}
            />
          )}
        </>
      ))}
    </>
  );
}
function ChangelogFeedDate({ date }) {
  const longDate = formatReadableDate(date);
  return (
    <Typography
      id={longDate}
      variant="h2"
      sx={{
        textAlign: { xs: 'left', md: 'right' },
        p: { xs: 0, md: 0.5 },
        fontWeight: 400,
        mb: 1,
        fontSize: 'md',
      }}
    >
      <Box
        component={FrameworkLink}
        to={`#${longDate}`}
        sx={{
          textDecoration: 'none',
          color: 'gray.500',
          '&:hover': {
            color: 'gray.600',
            cursor: 'pointer',
          },
        }}
      >
        {formatReadableDate(date)}
      </Box>
    </Typography>
  );
}

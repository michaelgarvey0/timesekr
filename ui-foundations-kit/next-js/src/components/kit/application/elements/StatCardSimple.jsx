import { Box, Paper, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material';
import * as React from 'react';
import { TbInfoCircle } from 'react-icons/tb';
export default function StatCardSimple({
  title = 'Total tickets revenue',
  description = 'Amount made per day from all ticket sales, all events included',
  titleIcon,
  helpTooltipText,
  value = 4510,
  valuePrefix = '$',
  valueSuffix = '/day',
  detail = 'Jan 1 - Jan 31, 2021',
}) {
  const theme = useTheme();
  const matchesSmBreakpoint = useMediaQuery(theme.breakpoints.up('sm'));
  const valueShouldBeDeemphasized = value === undefined || value === null || value === 0;
  return (
    <Paper
      variant="outlined"
      sx={{
        padding: { xs: 1.5, md: 2, lg: 3 },
        display: 'flex',
        flexDirection: 'column',
        ...(!matchesSmBreakpoint && {
          borderRadius: 0,
          '&:first-child': {
            borderTopLeftRadius: (theme) => theme.shape.borderRadius,
            borderTopRightRadius: (theme) => theme.shape.borderRadius,
            borderBottomWidth: 0,
          },
          '&:last-child': {
            borderBottomLeftRadius: (theme) => theme.shape.borderRadius,
            borderBottomRightRadius: (theme) => theme.shape.borderRadius,
          },
          '&&&:not(:first-child):not(:last-child)': {
            borderRadius: 0,
            borderBottomWidth: 0,
          },
        }),
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          maxHeight: 24,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            color: 'gray.500',
            overflow: 'hidden',
          }}
        >
          {titleIcon && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'gray.400',
                bgcolor: 'gray.100',
                borderRadius: 1,
                p: 0.5,
              }}
            >
              {titleIcon}
            </Box>
          )}
          <Typography
            sx={{
              color: 'gray.700',
              fontSize: 'md',
              fontWeight: 600,
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            }}
          >
            {title}
          </Typography>
          {helpTooltipText && (
            <Tooltip title={helpTooltipText}>
              <TbInfoCircle />
            </Tooltip>
          )}
        </Box>
      </Box>
      {description && (
        <Typography
          sx={{
            color: 'gray.500',
            fontSize: 'sm',
            fontWeight: 400,
          }}
        >
          {description}
        </Typography>
      )}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          flexWrap: 'wrap',
          my: { xs: 0, sm: 0.5 },
        }}
      >
        <>
          <Typography
            sx={{
              fontSize: { xs: 'lg', md: '32px' },
              fontWeight: 'bold',
              color: valueShouldBeDeemphasized ? 'gray.300' : 'gray.800',
              letterSpacing: '-1px',
              lineHeight: 1,
            }}
          >
            <Box
              component="span"
              sx={{
                fontSize: { xs: 'sm', md: 'md' },
                marginRight: 0.25,
              }}
            >
              {valuePrefix}
            </Box>
            {value}
            <Box
              component="span"
              sx={{
                fontWeight: 400,
                letterSpacing: '0',
                fontSize: { xs: 'sm', md: 'md' },
                color: 'gray.500',
                marginLeft: 0.25,
              }}
            >
              {valueSuffix}
            </Box>
          </Typography>
        </>
      </Box>
      {detail && (
        <Box
          sx={{
            paddingY: 1,
            fontSize: 'sm',
            fontWeight: 500,
          }}
        >
          {detail}
        </Box>
      )}
    </Paper>
  );
}

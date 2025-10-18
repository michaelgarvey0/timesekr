import { Box, Typography } from '@mui/material';
import * as React from 'react';
import { Breadcrumb } from '../components/Breadcrumb';
import { usePageTitle } from '../framework/usePageTitle';
export function DashboardHeader({
  title,
  subtitle,
  actions,
  secondaryActions,
  breadcrumbItemList,
}) {
  usePageTitle(title);
  return (
    <Box
      data-tour="dashboard-header"
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          // minHeight: '60px',
          // borderBottom: (theme) => `0.5px solid ${theme.palette.gray['200']}`,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            rowGap: { xs: 1.5, sm: 0.5 },
            flexWrap: 'wrap',
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              fontWeight: 500,
              fontSize: 'xl',
            }}
          >
            {breadcrumbItemList ? (
              <Breadcrumb fontSize="xl" itemList={breadcrumbItemList} />
            ) : (
              title
            )}
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            {actions}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          minHeight: '45px',
          display: !subtitle && !secondaryActions ? 'none' : 'flex',
          alignItems: 'center',
          py: 1,
          borderBottom: (theme) => `0.5px solid ${theme.palette.gray['200']}`,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            flexWrap: 'wrap',
            alignItems: { xs: 'flex-start', md: 'center' },
            justifyContent: 'space-between',
            gap: 1,
            width: '100%',
          }}
        >
          {subtitle && (
            <Typography fontSize="xs" color="gray.500">
              {subtitle}
            </Typography>
          )}
          {secondaryActions && secondaryActions}
        </Box>
      </Box>
    </Box>
  );
}

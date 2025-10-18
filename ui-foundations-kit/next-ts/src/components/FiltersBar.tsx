'use client'
import { Box } from '@mui/material';
import { CustomFilterButton } from '~/components/CustomFilterButton';
import { CustomFilterConfig } from '~/components/CustomFilterDefinitions';
import { CustomFilterType } from '~/core/filters';

export function FiltersBar({
  activeFilters,
  editFilter,
  removeFilter,
  availableFilters = [],
  children,
}: {
  activeFilters: CustomFilterType[];
  editFilter: (filter: CustomFilterType, index: number) => void;
  removeFilter: (filter: CustomFilterType) => void;
  availableFilters?: CustomFilterConfig[];
  children?: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 1,
        flexWrap: 'wrap',
        justifyContent: { xs: 'unset', md: 'space-between' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 1,
          color: 'gray.500',
          fontSize: 'sm',
        }}
      >
        {availableFilters.map((filter, index) => {
          const matchingFilter = activeFilters.find((f) => f.field === filter.field);
          return (
            <CustomFilterButton
              key={filter.field}
              fieldType={filter.field}
              operatorType={matchingFilter?.operator}
              value={matchingFilter?.value || ''}
              filterIndex={index}
              onRemove={removeFilter}
              onEdit={editFilter}
              filterDefinition={availableFilters?.find((f) => f.field === filter.field)}
            />
          );
        })}
      </Box>
      {children}
    </Box>
  );
}

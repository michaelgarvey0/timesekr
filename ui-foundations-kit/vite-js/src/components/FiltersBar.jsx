import { Box } from '@mui/material';
import { CustomFilterButton } from '../components/CustomFilterButton';
export function FiltersBar({
  activeFilters,
  editFilter,
  removeFilter,
  availableFilters = [],
  children,
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

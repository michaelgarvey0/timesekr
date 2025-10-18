import { Box, Button } from '@mui/material';
import { TbPlus } from 'react-icons/tb';
import { DashboardHeader } from '../components/DashboardHeader';
import { PageContainer } from '../components/PageContainer';
import { PivotTable } from '../components/PivotTable';
import { AGE_DISTRIBUTION } from '../data/age-distribution';
export function Pivot() {
  return (
    <PageContainer>
      <DashboardHeader
        title="Pivot"
        actions={
          <>
            <Button
              startIcon={<TbPlus />}
              variant="contained"
              onClick={() => {
                console.log('perform CSV export');
              }}
            >
              Export CSV
            </Button>
          </>
        }
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Box
          sx={{
            fontSize: 'sm',
            color: 'gray.600',
          }}
        >
          Build complex data grids on top of the MUI DataGrid, capable of aggregating data across
          multiple columns and rows in Excel like spreadsheets.
        </Box>
        <PivotTable
          data={AGE_DISTRIBUTION}
          options={{
            rowField: 'event_name',
            columnField: 'age_group',
            valueField: 'count',
            aggStrategy: 'sum',
            hideTotalColumn: false,
            hideTotalRow: true,
          }}
        />
        <Box
          sx={{
            fontSize: 'sm',
            color: 'gray.600',
          }}
        >
          Take the same dataset and pass in new parameters like{' '}
          <code>aggStrategy: 'percentage'</code> to get a different result. Control these with UI to
          make it more dynamic.
        </Box>
        <PivotTable
          data={AGE_DISTRIBUTION}
          cellFormatter={(value) => {
            return value ? `${(value * 100).toFixed(2)}%` : '0%';
          }}
          options={{
            rowField: 'event_name',
            columnField: 'age_group',
            valueField: 'count',
            aggStrategy: 'percentage',
          }}
        />
      </Box>
    </PageContainer>
  );
}

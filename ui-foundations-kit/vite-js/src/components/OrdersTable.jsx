import { Box, Portal } from '@mui/material';
import { GridToolbarQuickFilter } from '@mui/x-data-grid';
import React from 'react';
import {
  currencyColumnFactory,
  dateColumnFactory,
  genericColumnFactory,
  idColumnFactory,
} from '../components/ColumnDefinitions';
import {
  customerNameFilterConfig,
  earningsFilterConfig,
  orderDateFilterConfig,
  orderStatusFilterConfig,
  priceFilterConfig,
} from '../components/CustomFilterDefinitions';
import { FiltersBar } from '../components/FiltersBar';
import { StatusBadge } from '../components/StatusBadge';
import { Table } from '../components/Table';
import { clientFiltering } from '../core/filters';
import { formatReadableDatetime } from '../core/formatters';
import { DUMMY_ORDERS } from '../data/orders';
import { useFilters } from '../hooks/useFilters';
export function OrdersTable({ tableHeight, allowCheckboxSelection = false }) {
  const { filters, editFilter, removeFilter } = useFilters();
  // data can be transformed here before being passed to the Table component
  const transformedData = DUMMY_ORDERS.map((order) => ({
    ...order,
    earnings: order.price * order.quantity,
  }));
  const columnDefinitions = [
    idColumnFactory({
      field: 'order_id',
      headerName: 'Order ID',
      minWidth: 150,
    }),
    genericColumnFactory({
      field: 'event_name',
      headerName: 'Event',
      minWidth: 125,
      flex: 2,
    }),
    currencyColumnFactory({
      field: 'price',
      headerName: 'Price',
    }),
    genericColumnFactory({
      field: 'quantity',
      headerName: 'Qty.',
      flex: 0.5,
      renderCell: (params) => (
        <Box
          sx={{
            fontSize: 'xs',
            color: 'gray.500',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          x{params.value}
        </Box>
      ),
    }),
    currencyColumnFactory({
      field: 'earnings',
      headerName: 'Earnings',
    }),
    genericColumnFactory({
      field: 'customer_name',
      headerName: 'Customer Name',
      minWidth: 150,
      flex: 2,
    }),
    dateColumnFactory({
      field: 'order_date',
      headerName: 'Order Date',
      flex: 1.5,
      minWidth: 200,
      renderCell: (params) => (
        <Box
          sx={{
            fontSize: 'xs',
            color: 'gray.600',
          }}
        >
          {formatReadableDatetime(params.value)}
        </Box>
      ),
    }),
    genericColumnFactory({
      field: 'status',
      headerName: 'Order Status',
      flex: 1.5,
      minWidth: 150,
      headerAlign: 'right',
      renderCell: (params) => (
        <Box
          sx={{
            lineHeight: 1.2,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <StatusBadge status={params.value} />
        </Box>
      ),
    }),
  ];
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        gap: 1.5,
      }}
    >
      <FiltersBar
        activeFilters={filters}
        editFilter={editFilter}
        removeFilter={removeFilter}
        availableFilters={[
          customerNameFilterConfig,
          orderStatusFilterConfig,
          priceFilterConfig,
          earningsFilterConfig,
          orderDateFilterConfig,
        ]}
      >
        <Box id="filter-panel" />
      </FiltersBar>
      <Table
        tableHeight={tableHeight}
        columns={columnDefinitions}
        rows={clientFiltering(transformedData, filters)}
        initialState={{
          sorting: { sortModel: [{ field: 'order_date', sort: 'desc' }] },
        }}
        pagination
        hideFooter={false}
        disableColumnFilter
        slots={{ toolbar: CustomQuickSearch }}
        checkboxSelection={allowCheckboxSelection}
        getRowClassName={(params) => {
          if (params.row.status === 'failed') {
            return 'datagrid-row-error';
          }
          return '';
        }}
      />
    </Box>
  );
}
function CustomQuickSearch(props) {
  return (
    <React.Fragment>
      <Portal container={() => document.getElementById('filter-panel')}>
        <GridToolbarQuickFilter
          variant="filled"
          placeholder="Search name, ID, status..."
          sx={{
            width: 200,
            borderColor: 'gray.200',
            paddingBottom: 0,
            '.MuiInputBase-root': {
              fontSize: 'xs',
              height: 30,
              paddingX: 0.5,
            },
            '.MuiInputBase-input': {
              paddingY: 0,
            },
            '.MuiSvgIcon-root': {
              height: 16,
              width: 16,
            },
          }}
        />
      </Portal>
    </React.Fragment>
  );
}

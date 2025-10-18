'use client'
import { Avatar, Box, Portal } from '@mui/material';
import { GridColDef, GridToolbarQuickFilter } from '@mui/x-data-grid';
import React from 'react';
import { TbCheck, TbClock, TbMinus } from 'react-icons/tb';
import { match } from 'ts-pattern';
import {
  currencyColumnFactory,
  dateColumnFactory,
  genericColumnFactory,
} from '~/components/ColumnDefinitions';
import { Table } from '~/components/Table';
import { formatReadableDatetime } from '~/core/formatters';
import { DUMMY_SPEAKERS } from '~/data/speakers';
import { useFilters } from '~/hooks/useFilters';

const statusMatcher = (status: string) => {
  return match(status)
    .with('approved', () => ({
      color: 'green.600',
      backgroundColor: 'green.50',
      borderColor: 'green.100',
      label: 'Approved',
      icon: <TbCheck />,
    }))
    .with('pending', () => ({
      color: 'primary.500',
      backgroundColor: 'primary.50',
      borderColor: 'primary.100',
      label: 'Pending',
      icon: <TbMinus />,
    }))
    .with('canceled', () => ({
      color: 'gray.500',
      backgroundColor: 'gray.50',
      borderColor: 'gray.100',
      label: 'Canceled',
      icon: <TbMinus />,
    }))
    .otherwise(() => ({
      color: 'gray.600',
      backgroundColor: 'gray.100',
      borderColor: 'gray.200',
      label: 'Unknown',
      icon: <TbMinus />,
    }));
};

export function SpeakersList({ tableHeight }: { tableHeight?: number }) {
  const { filters, editFilter, removeFilter } = useFilters();

  const columnDefinitions: GridColDef[] = [
    genericColumnFactory({
      field: 'name',
      headerName: 'Name',
      minWidth: 130,
      flex: 1.5,
      renderCell: (params) => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Box
            sx={{
              width: 32,
              height: 32,
              backgroundColor: 'gray.100',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 'sm',
              borderRadius: 999,
            }}
          >
            <Avatar
              src={`https://i.pravatar.cc/100?u=${params.row.name}`}
              sx={{
                width: 26,
                height: 26,
              }}
            />
          </Box>
          <Box
            sx={{
              color: 'gray.600',
            }}
          >
            {params.row.name}
          </Box>
        </Box>
      ),
    }),
    genericColumnFactory({
      field: 'talk_title',
      headerName: 'Talk Title',
      minWidth: 180,
      flex: 2,
    }),
    genericColumnFactory({
      field: 'bio',
      headerName: 'Bio',
      minWidth: 125,
      flex: 1,
    }),
    currencyColumnFactory({
      field: 'talk_length',
      headerName: 'Length',
      renderCell: (params) => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            color: 'gray.500',
            gap: 0.5,
          }}
        >
          <TbClock />
          {params.value} min
        </Box>
      ),
    }),
    genericColumnFactory({
      field: 'event_name',
      headerName: 'Event Name',
      minWidth: 150,
      flex: 2,
    }),
    dateColumnFactory({
      field: 'last_updated',
      headerName: 'Last Activity',
      flex: 1.5,
      minWidth: 200,
      renderCell: (params) => (
        <Box
          sx={{
            fontSize: 'xs',
            color: 'gray.600',
          }}
        >
          {formatReadableDatetime(new Date())}
        </Box>
      ),
    }),
    genericColumnFactory({
      field: 'status',
      headerName: 'Talk Status',
      flex: 1.5,
      minWidth: 150,
      headerAlign: 'right',
      renderCell: (params) => {
        const statusMatch = statusMatcher(params.value);
        return (
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
            <Box
              sx={{
                px: 1,
                py: 0.25,
                display: 'flex',
                alignItems: 'center',
                gap: 0.25,
                borderRadius: 999,
                borderWidth: 1,
                borderStyle: 'solid',
                fontSize: 'xs',
                // color: 'green.600',
                // backgroundColor: 'green.50',
                // borderColor: 'green.100',
                color: statusMatch.color,
                backgroundColor: statusMatch.backgroundColor,
                borderColor: statusMatch.borderColor,
              }}
            >
              {statusMatch.icon}
              {statusMatch.label}
            </Box>
          </Box>
        );
      },
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
      <Box id="filter-panel" />
      <Table
        tableHeight={tableHeight}
        columns={columnDefinitions}
        rows={DUMMY_SPEAKERS}
        initialState={{
          sorting: { sortModel: [{ field: 'status', sort: 'desc' }] },
        }}
        getRowClassName={(params) => {
          if (params.row.status === 'canceled') {
            return 'datagrid-row-disabled';
          }
          return '';
        }}
        pagination
        hideFooter={false}
        disableColumnFilter
        slots={{ toolbar: CustomQuickSearch }}
      />
    </Box>
  );
}

function CustomQuickSearch(props: any) {
  return (
    <React.Fragment>
      <Portal container={() => document.getElementById('filter-panel')!}>
        <GridToolbarQuickFilter
          variant="filled"
          placeholder="Search by name, status..."
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

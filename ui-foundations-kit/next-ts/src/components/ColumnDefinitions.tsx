'use client'
import { GridColDef } from '@mui/x-data-grid';
import { CopyBlock } from '~/components/CopyBlock';

import { formatAbbreviatedNumber, formatReadableDate } from '~/core/formatters';

/** ------------------- **/
/*  Column Factory builders
/** ------------------- **/
// accept some arguments and spit out a MUI column definition with some defaults set
export function genericColumnFactory(columnParams = {} as GridColDef): GridColDef {
  return {
    flex: 1,
    ...columnParams,
  };
}

export function dateColumnFactory(columnParams = {} as GridColDef): GridColDef {
  return genericColumnFactory({
    ...columnParams,
    field: columnParams?.field || 'date',
    minWidth: columnParams?.minWidth || 100,
    headerName: columnParams?.headerName || 'Date',
    valueFormatter: (value) => (value ? formatReadableDate(value) : null),
  });
}

export function currencyColumnFactory(columnParams = {} as GridColDef): GridColDef {
  return genericColumnFactory({
    ...columnParams,
    field: columnParams?.field || 'price',
    minWidth: columnParams?.minWidth || 100,
    type: 'number',
    headerName: columnParams?.headerName || 'Price',
    valueFormatter: (value) => (value ? `$${formatAbbreviatedNumber(value)}` : null),
  });
}

export function numericColumnFactory(columnParams = {} as GridColDef): GridColDef {
  return genericColumnFactory({
    ...columnParams,
    field: columnParams.field,
    minWidth: columnParams?.minWidth || 100,
    type: 'number',
  });
}

export function idColumnFactory(columnParams = {} as GridColDef): GridColDef {
  return genericColumnFactory({
    ...columnParams,
    field: columnParams?.field || 'id',
    minWidth: columnParams?.minWidth || 100,
    headerName: columnParams?.headerName || 'ID',
    renderCell: (params) => <CopyBlock copyValue={params.value as string} />,
  });
}

/** ------------------- **/
/*  In-app Column Definitions
/** ------------------- **/

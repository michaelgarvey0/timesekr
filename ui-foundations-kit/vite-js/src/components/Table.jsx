import { Box, useMediaQuery, useTheme } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import * as React from 'react';
import { DotLoader } from '../components/DotLoader';
export const defaultAscendingSortOrder = ['asc', 'desc', null];
export const defaultDescendingSortOrder = ['desc', 'asc', null];
export function Table({
  tableHeight,
  sortingOrder = defaultAscendingSortOrder,
  hideFooter = true,
  loading,
  columns,
  rows = [],
  variant = 'simple',
  ...props
}) {
  const [sortModel, setSortModel] = React.useState(
    props?.initialState?.sorting ? props?.initialState?.sorting?.sortModel : [],
  );
  const theme = useTheme();
  const matchesSmBreakpoint = useMediaQuery(theme.breakpoints.up('sm'));
  return (
    // wrapping components to prevent tables from overflowing outside their parent containers
    <div
      style={{
        flex: 1,
        height: '100%',
        width: '100%',
        overflowX: 'auto',
        overflowY: 'hidden',
      }}
    >
      <Box
        sx={{
          flex: 1,
          minHeight: tableHeight,
          maxHeight: '80vh',
          height: tableHeight || '100%',
          width: '100%',
          borderTop: (theme) => `1px solid ${theme.palette.gray[200]}`,
        }}
      >
        <DataGrid
          disableRowSelectionOnClick
          columnHeaderHeight={matchesSmBreakpoint ? 48 : 42}
          rowHeight={matchesSmBreakpoint ? 52 : 42}
          sortingOrder={sortingOrder}
          sortModel={sortModel}
          onSortModelChange={(model) => setSortModel(model)}
          hideFooter={hideFooter}
          loading={loading}
          columns={columns}
          rows={rows}
          sx={{
            '.MuiDataGrid-columnsContainer': {
              backgroundColor: 'transparent',
              borderTopLeftRadius: theme.shape.borderRadius,
              borderTopRightRadius: theme.shape.borderRadius,
            },
            [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]: {
              outline: 'none',
            },
            [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]: {
              outline: 'none',
            },
            '.datagrid-row-error': {
              backgroundColor: theme.palette.red['50'],
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23${hslToHex(theme.palette.red['200'])}' fill-opacity='0.75' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
              '[data-mui-color-scheme="dark"] &': {
                backgroundColor: theme.palette.red['50'],
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23${hslToHex(theme.palette.red['200'])}' fill-opacity='0.75' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
              },
            },
            '.datagrid-row-disabled': {
              '.MuiCheckbox-root': {
                visibility: 'hidden',
              },
              opacity: 0.75,
              backgroundColor: theme.palette.gray['50'],
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23${hslToHex(theme.palette.gray['200'])}' fill-opacity='0.75' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
              '[data-mui-color-scheme="dark"] &': {
                backgroundColor: theme.palette.gray['50'],
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23${hslToHex(theme.palette.gray['200'])}' fill-opacity='0.75' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
              },
            },
            ...(variant === 'simple' && {
              borderRadius: 0,
              '.MuiDataGrid-columnHeader': {
                borderTopRightRadius: 0,
                borderTopLeftRadius: 0,
                backgroundColor: theme.palette.background.paper,
              },
              border: 'none',
              // remove the left padding from the first column, where aria-colindex="1"
              ".MuiDataGrid-cell[aria-colindex='1']": {
                paddingLeft: 0,
              },
              ".MuiDataGrid-columnHeader[aria-colindex='1']": {
                paddingLeft: 0,
              },
            }),
          }}
          {...props}
          slots={{
            ...props.slots,
            loadingOverlay: () => {
              return (
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    height: '100%',
                    width: '100%',
                    pointerEvents: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 4,
                    // make a pseudo element that is partially opaque from bottom to top
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      inset: 0,
                      height: '100%',
                      width: '100%',
                      pointerEvents: 'none',
                      zIndex: 5,
                      opacity: 0.5,
                      background: (theme) => `linear-gradient(to top,
                      ${theme.palette.background.paper},
                      ${theme.palette.background.paper} 100%
                      )`,
                    },
                  }}
                >
                  <DotLoader loading={true} dotSize={6} />
                </Box>
              );
            },
          }}
        />
      </Box>
    </div>
  );
}
function hslToHex(hslString) {
  if (!hslString) {
    return '';
  }
  const matches = hslString.match(/\d+/g);
  // check that we got matches
  if (!matches) {
    return '';
  }
  // Extract the H, S, and L values from the HSL string
  const [h, s, l] = matches.map(Number);
  // Convert HSL to Hex
  const hslToHex = (h, s, l) => {
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, '0');
    };
    return `${f(0)}${f(8)}${f(4)}`;
  };
  return hslToHex(h, s, l);
}

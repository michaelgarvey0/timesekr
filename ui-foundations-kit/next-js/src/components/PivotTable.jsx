'use client';
import { Box } from '@mui/material';
import { TbAwardFilled, TbClick } from 'react-icons/tb';
import { defaultDescendingSortOrder, Table } from '../components/Table';
import { pivotData } from '../core/pivot-helpers';
const DEEMPHASIS_LABEL = 'Uncategorized';
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function titleCase(string) {
  return string
    .split('_')
    .map((word) => capitalizeFirstLetter(word))
    .join(' ');
}
function getFieldLabel(field) {
  if (field === 'raw_color') return 'Color';
  if (field === 'color') return 'AI Color';
  if (field === 'company_id') return 'Company';
  return titleCase(field);
}
function defaultCellFormatter(value) {
  return value;
}
export function PivotTable({
  apiRef,
  data = [],
  options,
  cellFormatter,
  onCellHover,
  onCellClick,
  loading = false,
  percentageOverride = false,
  tableSortMethod = () => 0,
  columnVisibilityModel,
  onColumnVisibilityModelChange,
  TableProps,
}) {
  const {
    columnField,
    renderColumnHeader,
    columnValueGetter,
    rowField,
    renderRowHeader,
    valueField,
    aggStrategy,
    fixedHighlight = false,
  } = options;
  const formatter = cellFormatter || defaultCellFormatter;
  const pivotedData = pivotData(data, {
    columnField,
    rowField,
    valueField,
    aggStrategy,
    percentageOverride,
  });
  const numColumns = pivotedData.columnSet.size;
  // iterate through the pivotedData.columnSet to get all column names from the columnField
  const columns = [
    {
      field: String(rowField),
      cellClassName: 'row-pivot-name',
      minWidth: 180,
      headerName: `${getFieldLabel(String(rowField))} / ${getFieldLabel(String(columnField))}`,
      renderCell: (params) => {
        if (params.id === DEEMPHASIS_LABEL) return <></>;
        return <>{renderRowHeader ? renderRowHeader(String(params.id)) : params.id}</>;
      },
    },
    ...Array.from(pivotedData.columnSet)
      .sort(tableSortMethod)
      .map((column) => {
        return {
          field: column,
          minWidth: numColumns > 5 ? 120 : 160,
          // the header should be blank for uncategorized columns, but should allow the calling table to customize what shows up in the header for stuff like exports
          headerName:
            column === DEEMPHASIS_LABEL
              ? ''
              : columnValueGetter
                ? columnValueGetter(String(column))
                : column,
          renderHeader:
            renderColumnHeader && column !== DEEMPHASIS_LABEL
              ? () => renderColumnHeader(column)
              : undefined,
          type: 'number',
          cellClassName: 'pivot-number-cell',
          renderCell: (params) => {
            const currentPivotColumn = params.colDef.field;
            const pivotValue = params.row?.[currentPivotColumn] || 0;
            const percentageOfMax = pivotValue
              ? pivotValue / (fixedHighlight ? 1 : pivotedData.maxValue)
              : 0;
            const rowId = params.id;
            return (
              <Box
                sx={{
                  position: 'relative',
                  padding: 0.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  height: '100%',
                  ...(rowId !== 'Total' && {
                    color: percentageOfMax > 0.75 ? 'white' : 'gray.800',
                    backgroundColor: `rgba(37, 99, 235, ${percentageOfMax})`,
                  }),
                  ...(rowId === 'Total' && {
                    fontWeight: 500,
                    svg: {
                      display: 'none',
                    },
                  }),
                  ...(onCellClick && {
                    '&:hover': {
                      cursor: 'pointer',
                      '#click-icon': {
                        opacity: 1,
                      },
                    },
                  }),
                }}
                onMouseEnter={() => {
                  if (onCellHover) {
                    onCellHover({
                      column: currentPivotColumn,
                      row: String(rowId),
                      value: pivotValue,
                    });
                  }
                }}
                onClick={() => {
                  if (onCellClick) {
                    console.log('perform action');
                  }
                }}
              >
                <Box
                  id="click-icon"
                  sx={{
                    opacity: 0,
                    transition: 'opacity 0.2s ease-in-out',
                    color: 'gray.500',
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <TbClick />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: 'yellow.500',
                    px: 0.5,
                  }}
                >
                  {pivotedData.maxValue === pivotValue &&
                    // make sure that percentages that go up to 100 don't just show award badges everywhere
                    pivotedData.maxValue !== 1 && <TbAwardFilled />}
                </Box>
                <Box>{pivotValue ? formatter(pivotValue) : null}</Box>
              </Box>
            );
          },
        };
      }),
    {
      field: 'total_column',
      headerName: 'Total',
      type: 'number',
      // calculate the total for each row
      renderCell: (params) => {
        const rowId = params.id;
        let renderValue = null;
        if (rowId === 'Total') {
          const overallTotal = Object.values(pivotedData.data).reduce((acc, curr) => {
            const rowTotal = Object.values(curr).reduce((acc, curr) => acc + Number(curr), 0);
            return acc + rowTotal;
          }, 0);
          renderValue = overallTotal;
        } else if (pivotedData.data[rowId] === undefined) {
          renderValue = null;
        } else {
          const rowTotal = Object.values(pivotedData.data[rowId]).reduce(
            (acc, curr) => acc + Number(curr),
            0,
          );
          renderValue = rowTotal;
        }
        return (
          <Box
            sx={{
              fontWeight: 500,
            }}
          >
            {renderValue ? formatter(renderValue) : null}
          </Box>
        );
      },
    },
  ];
  const rows = Array.from(pivotedData.rowSet).map((row) => {
    return {
      id: row,
      total_value:
        Object.values(pivotedData?.data?.[row]).reduce((acc, curr) => acc + Number(curr), 0) || 0,
      [row]: row,
      ...pivotedData.data[row],
    };
  });
  const sortedRows = rows.sort((a, b) => {
    // put '' at the bottom
    if (a.id === '' || a.id === DEEMPHASIS_LABEL) {
      return 1;
    }
    if (b.id === '' || b.id === DEEMPHASIS_LABEL) {
      return -1;
    }
    // sort by the total_column or total_value if available
    if (a.total_value > b.total_value) {
      return -1;
    }
    if (a.total_value < b.total_value) {
      return 1;
    }
    if (a.total_column > b.total_column) {
      return -1;
    }
    if (a.total_column < b.total_column) {
      return 1;
    }
    return 0;
  });
  // create a new row for totals based off of the columnSet totaled up
  const totalRow = {
    id: 'Total',
  };
  const sortedRowsWithTotal = [...sortedRows, totalRow];
  // calculate the total for each column
  Array.from(pivotedData.columnSet).forEach((column) => {
    // add a total for each column
    totalRow[column] = 0;
    // get the total value from the pivotedData.data
    const columnTotal = Object.values(pivotedData.data).reduce((acc, curr) => {
      // loop through all the values in the curr object
      Object.entries(curr).forEach(([key, value]) => {
        // if the key matches the column, add the value to the accumulator
        if (key === column) {
          acc += Number(value);
        }
      });
      return acc;
    }, 0);
    if (totalRow['total_column']) {
      totalRow['total_column'] += columnTotal;
    } else {
      totalRow['total_column'] = columnTotal;
    }
    totalRow[column] = columnTotal;
  });
  return (
    <Table
      {...TableProps}
      apiRef={apiRef}
      loading={loading}
      columns={columns}
      rows={sortedRowsWithTotal}
      rowHeight={40}
      sortingOrder={defaultDescendingSortOrder}
      sx={{
        '.pivot-number-cell': {
          padding: 0,
        },
        '.row-pivot-name': {
          backgroundColor: 'gray.100',
        },
      }}
      columnVisibilityModel={columnVisibilityModel}
      onColumnVisibilityModelChange={onColumnVisibilityModelChange}
    />
  );
}

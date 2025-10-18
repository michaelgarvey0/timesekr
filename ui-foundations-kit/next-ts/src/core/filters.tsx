'use client'
import { Box } from '@mui/material';
import * as React from 'react';
import { BsFileFontFill } from 'react-icons/bs';
import { TbCalendar, TbCurrencyDollar, TbStatusChange } from 'react-icons/tb';
import { z } from 'zod';
import { StatusBadge } from '~/components/StatusBadge';

import { formatAbbreviatedNumber } from '~/core/formatters';

const operatorsSchema = z.union([
  z.literal('contains'),
  z.literal('equals'),
  z.literal('startsWith'),
  z.literal('endsWith'),
  z.literal('does_not_contain'),
  z.literal('is_not'),
  z.literal('is_descendant_of'),
  z.literal('greater_than'),
  z.literal('less_than'),
  z.literal('contains_exactly'),
]);
export const CustomFilterSchema = z.object({
  field: z.union([
    z.literal('title'),
    z.literal('name'),
    z.literal('customer_name'),
    z.literal('price'),
    z.literal('order_date'),
    z.literal('status'),
    z.literal('earnings'),
  ]),
  // value can be string | string[] for multi-select fields
  value: z.union([z.string(), z.array(z.string())]),
  operator: operatorsSchema,
});

export const CustomFiltersSchema = z.object({
  filters: z.array(CustomFilterSchema),
  sortModel: z.array(
    z.object({
      field: z.string(),
      sort: z.union([z.literal('asc'), z.literal('desc')]),
    }),
  ),
  pageNumber: z.number().catch(0),
  pageSize: z.number().catch(50),
  booleanMode: z.union([z.literal('any'), z.literal('all')]).optional(),
});
export type CustomFilterOperators = z.infer<typeof CustomFiltersSchema>['filters'][0]['operator'];
export type CustomFilterFields = z.infer<typeof CustomFiltersSchema>['filters'][0]['field'];
export type CustomFilterType = z.infer<typeof CustomFilterSchema>;
export type CustomFilters = z.infer<typeof CustomFiltersSchema>;
export type CustomFilterValue = CustomFilters['filters'][0]['value'];
export type DynamicBooleanMode = CustomFilters['booleanMode'];

export function encodeFilters(filters: CustomFilterType[]) {
  return encodeURIComponent(JSON.stringify(filters));
}

// simple naive hash that is probably subject to collisions and can't decompress, oh well
export function hashFilters(filters: CustomFilterType[]) {
  // get the first filter's value if it exists
  const firstFilterValue = filters?.[0]?.value || '';
  const stringifiedFilters = JSON.stringify(filters);
  const hash = stringifiedFilters.split('').reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);
  return `${firstFilterValue}-${Math.abs(hash).toString()}`;
}

export function getValuesOfField(filters: CustomFilterType[], field: CustomFilterFields) {
  const matchingFilters = filters.filter((f) => f.field === field);
  return matchingFilters.map((f) => f.value).flat();
}

// ------------------------------
// Fields, Operators and Configs
// ------------------------------
export const FILTER_FIELDS: {
  [K in CustomFilterFields]: {
    displayLabel: string;
    value: CustomFilterFields;
    icon: React.ReactNode;
    description: string;
    valueRenderer: (value: any, operatorType: CustomFilterOperators) => React.ReactNode;
  };
} = {
  title: {
    displayLabel: 'Title',
    value: 'title',
    icon: <BsFileFontFill />,
    description: 'Find products whose title matches a search term.',
    valueRenderer: defaultValueRenderer,
  },
  name: {
    displayLabel: 'Name',
    value: 'name',
    icon: <BsFileFontFill />,
    description: 'Find speakers by their name.',
    valueRenderer: defaultValueRenderer,
  },
  customer_name: {
    displayLabel: 'Customer Name',
    value: 'customer_name',
    icon: <BsFileFontFill />,
    description: 'Find products whose customer name matches a search term.',
    valueRenderer: defaultValueRenderer,
  },
  price: {
    displayLabel: 'Price',
    value: 'price',
    icon: <TbCurrencyDollar />,
    description: 'Find orders above or below a given price.',
    valueRenderer: (value: string, operatorType) => {
      return (
        <Box>
          {FILTER_OPERATORS[operatorType].chipLabel} ${formatAbbreviatedNumber(Number(value))}
        </Box>
      );
    },
  },
  earnings: {
    displayLabel: 'Earnings',
    value: 'earnings',
    icon: <TbCurrencyDollar />,
    description: 'Find orders that made at least a specific amount.',
    valueRenderer: (value: string, operatorType) => {
      return (
        <Box>
          {FILTER_OPERATORS[operatorType].chipLabel} ${formatAbbreviatedNumber(Number(value))}
        </Box>
      );
    },
  },
  order_date: {
    displayLabel: 'Order Date',
    value: 'order_date',
    icon: <TbCalendar />,
    description: 'Find orders that were made before or after a specific date.',
    valueRenderer: defaultValueRenderer,
  },
  status: {
    displayLabel: 'Status',
    value: 'status',
    icon: <TbStatusChange />,
    description: 'Find orders that have a specific status.',
    valueRenderer: (value, operatorType) => {
      return (
        <StatusBadge
          status={value as any}
          customSx={{
            gap: 0.25,
            pl: 0,
            pr: 0.5,
            py: 0,
            fontSize: '2xs',
          }}
        />
      );
    },
  },
};
export const FILTER_OPERATORS = {
  contains: {
    chipLabel: 'contains',
    selectLabel: 'contains',
    value: 'contains',
  },
  equals: {
    chipLabel: '=',
    selectLabel: 'equals',
    value: 'equals',
  },
  startsWith: {
    chipLabel: 'starts with',
    selectLabel: 'starts with',
    value: 'startsWith',
  },
  endsWith: {
    chipLabel: 'ends with',
    selectLabel: 'ends with',
    value: 'endsWith',
  },
  does_not_contain: {
    chipLabel: "doesn't contain",
    selectLabel: "doesn't contain",
    value: 'does_not_contain',
  },
  is_exactly: {
    chipLabel: 'is',
    selectLabel: 'is exactly',
    value: 'is_exactly',
  },
  is_not: {
    chipLabel: '≠',
    selectLabel: 'is not',
    value: 'is_not',
  },
  is_descendant_of: {
    chipLabel: '',
    selectLabel: 'is categorized as',
    value: 'is_exactly',
  },
  contains_exactly: {
    // This was created for the "title" field to allow for a less strict "exact" search
    chipLabel: 'has',
    selectLabel: 'contains exactly',
    value: 'contains_exactly',
  },
  greater_than: {
    chipLabel: '≥',
    selectLabel: 'is greater than or equal',
    value: 'greater_than',
  },
  less_than: {
    chipLabel: '≤',
    selectLabel: 'is less than or equal',
    value: 'less_than',
  },
} as const;
function defaultValueRenderer(
  value: CustomFilterValue,
  operatorType: CustomFilterOperators,
): React.ReactNode {
  return `${FILTER_OPERATORS[operatorType].chipLabel} ${value}`;
}
function multiTextValueRenderer(
  value: string[],
  operatorType?: CustomFilterOperators,
): React.ReactNode {
  const valueList = value.join(', ');
  if (operatorType === 'is_not') return `${FILTER_OPERATORS[operatorType].chipLabel} ${valueList}`;
  return valueList;
}

export type FilterMenuRendererParams = {
  temporaryFilters: CustomFilterType[];
  filterFields: CustomFilterFields[];
  onClick: (filterName: CustomFilterFields) => void;
};
export type FilterMenuRenderer = ({
  temporaryFilters,
  filterFields,
  onClick,
}: FilterMenuRendererParams) => React.ReactNode;

// this could be replaced with filters on the backend like in SQL, or the MUI datagrid can be upgraded ot the pro version for multi filtering
export function clientFiltering<T extends object>(data: T[], filters: CustomFilterType[]) {
  // apply multiple levels of filtering in the FE on a single data set
  return filters.reduce((filteredData, filter) => {
    return filteredData.filter((row) => {
      const rowValue = row[filter.field as keyof T];
      const stringRowValue = String(rowValue).toLocaleLowerCase();
      const stringFilterValue = String(filter.value.toString()).toLocaleLowerCase();
      switch (filter.operator) {
        case 'contains':
          return stringRowValue.includes(stringFilterValue as string);
        case 'equals':
          return stringRowValue === stringFilterValue;
        case 'startsWith':
          return stringRowValue.startsWith(stringFilterValue as string);
        case 'endsWith':
          return stringRowValue.endsWith(stringFilterValue as string);
        case 'does_not_contain':
          return !stringRowValue.includes(stringFilterValue as string);
        case 'is_not':
          return rowValue !== filter.value;
        case 'is_descendant_of':
          return rowValue === filter.value;
        case 'greater_than':
          return rowValue > filter.value;
        case 'less_than':
          return rowValue < filter.value;
        case 'contains_exactly':
          return stringRowValue
            ?.toString()
            ?.toLocaleLowerCase()
            .includes(stringFilterValue as string);
        default:
          return true;
      }
    });
  }, data);
}

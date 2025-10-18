'use client';
import { Box, FilledInput, MenuItem, Select as MuiSelect, TextField } from '@mui/material';
import * as React from 'react';
import { TbCornerDownRight } from 'react-icons/tb';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { ColorDot } from '../components/ColorDot';
import { ALL_STATUSES_LIST, statusMatcher } from '../components/StatusBadge';
import { FILTER_OPERATORS } from '../core/filters';
function TextOperatorValueBlock({
  selectedOperator,
  setSelectedOperator,
  selectedValue,
  setSelectedValue,
}) {
  const operatorGroup = [
    FILTER_OPERATORS.contains,
    FILTER_OPERATORS.equals,
    FILTER_OPERATORS.startsWith,
    FILTER_OPERATORS.endsWith,
  ];
  useSetDefaultOperator({
    operator: selectedOperator,
    operatorGroup,
    setSelectedOperator,
  });
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <MuiSelect
        value={selectedOperator || FILTER_OPERATORS.contains.value}
        onChange={(event) => setSelectedOperator(event.target.value)}
      >
        {operatorGroup.map((operator) => (
          <MenuItem key={operator.value} dense value={operator.value}>
            {operator.selectLabel}
          </MenuItem>
        ))}
      </MuiSelect>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 0.5,
        }}
      >
        <Box
          sx={{
            color: 'gray.400',
          }}
        >
          <TbCornerDownRight color="currentColor" />
        </Box>
        <FilledInput
          name="filterValue"
          value={selectedValue}
          onChange={(event) => {
            setSelectedValue(event.target.value);
          }}
          sx={{
            width: '100%',
          }}
        />
      </Box>
    </Box>
  );
}
function NumericOperatorValueBlock({
  selectedOperator,
  setSelectedOperator,
  selectedValue,
  setSelectedValue,
  showCurrencyAdornment = false,
  maxValue,
  stepValue,
}) {
  const operatorGroup = [FILTER_OPERATORS.greater_than, FILTER_OPERATORS.less_than];
  useSetDefaultOperator({
    operator: selectedOperator,
    operatorGroup,
    setSelectedOperator,
  });
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <MuiSelect
        value={selectedOperator}
        onChange={(event) => setSelectedOperator(event.target.value)}
      >
        {operatorGroup.map((operator) => (
          <MenuItem key={operator.value} dense value={operator.value}>
            {operator.selectLabel}
          </MenuItem>
        ))}
      </MuiSelect>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 0.5,
        }}
      >
        <Box
          sx={{
            color: 'gray.400',
          }}
        >
          <TbCornerDownRight color="currentColor" />
        </Box>
        <FilledInput
          name="filterValue"
          type="number"
          startAdornment={
            showCurrencyAdornment && (
              <Box component="span" color="gray.400">
                $
              </Box>
            )
          }
          inputProps={{
            min: 0,
            max: maxValue,
            step: stepValue,
          }}
          value={selectedValue}
          onChange={(event) => {
            setSelectedValue(event.target.value);
          }}
          sx={{
            width: '100%',
          }}
          // prevent scrolling from changing the value inside the input
          onWheel={(event) => {
            // @ts-ignore
            event.target.blur();
          }}
        />
      </Box>
    </Box>
  );
}
function SelectOptionsOperatorValueBlock({
  setSelectedOperator,
  setSelectedValue,
  selectedValue,
  options,
  startAdornment,
}) {
  const coercedSelectedValue = Array.isArray(selectedValue) ? options?.[0].value : selectedValue;
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        minWidth: 320,
      }}
    >
      <MuiSelect
        input={<FilledInput name="filterValue" />}
        value={coercedSelectedValue}
        onChange={(event) => {
          setSelectedValue(event.target.value);
          setSelectedOperator(FILTER_OPERATORS.equals.value);
        }}
        sx={{
          '.MuiSelect-select': {
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            sx={{ display: 'flex', justifyContent: 'space-between' }}
            dense
          >
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.5,
              }}
            >
              {startAdornment && startAdornment(option)}
              {option.label}
            </Box>
          </MenuItem>
        ))}
      </MuiSelect>
    </Box>
  );
}
function OrderDateValueBlock({
  selectedOperator,
  setSelectedOperator,
  selectedValue,
  setSelectedValue,
}) {
  const operatorGroup = [FILTER_OPERATORS.greater_than, FILTER_OPERATORS.less_than];
  useSetDefaultOperator({
    operator: selectedOperator,
    operatorGroup,
    setSelectedOperator,
  });
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <MuiSelect
        value={selectedOperator}
        onChange={(event) => {
          setSelectedOperator(event.target.value);
        }}
      >
        {operatorGroup.map((operator) => (
          <MenuItem key={operator.value} dense value={operator.value}>
            {operator.selectLabel}
          </MenuItem>
        ))}
      </MuiSelect>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 0.5,
        }}
      >
        <Box
          sx={{
            color: 'gray.400',
          }}
        >
          <TbCornerDownRight color="currentColor" />
        </Box>
        <DatePicker
          value={dayjs(selectedValue)}
          onChange={(date) => {
            setSelectedValue(date?.format('YYYY-MM-DD'));
          }}
          sx={{
            width: '100%',
          }}
          slots={{
            textField: (params) => (
              <TextField variant="filled" sx={{ width: '100%' }} {...params} />
            ),
          }}
        />
      </Box>
    </Box>
  );
}
function useSetDefaultOperator({ operator, operatorGroup, setSelectedOperator }) {
  // prevent infinite rerenders with setSelectedOperator in the useEffect dep array
  const memoizedSetSelectedOperator = React.useCallback(setSelectedOperator, [setSelectedOperator]);
  React.useEffect(() => {
    // if the operator is undefined coming in, set it to the first operator in the group
    if (!operator) {
      memoizedSetSelectedOperator(operatorGroup[0].value);
    }
  }, [operator, operatorGroup, memoizedSetSelectedOperator]);
  return;
}
export const titleFilterConfig = {
  field: 'title',
  operatorValueBlock: (params) => <TextOperatorValueBlock {...params} />,
};
export const nameFilterConfig = {
  field: 'name',
  operatorValueBlock: (params) => <TextOperatorValueBlock {...params} />,
};
export const customerNameFilterConfig = {
  field: 'customer_name',
  operatorValueBlock: (params) => <TextOperatorValueBlock {...params} />,
};
export const priceFilterConfig = {
  field: 'price',
  operatorValueBlock: (params) => <NumericOperatorValueBlock showCurrencyAdornment {...params} />,
};
export const earningsFilterConfig = {
  field: 'earnings',
  operatorValueBlock: (params) => <NumericOperatorValueBlock showCurrencyAdornment {...params} />,
};
export const orderDateFilterConfig = {
  field: 'order_date',
  operatorValueBlock: (params) => <OrderDateValueBlock {...params} />,
};
export const orderStatusFilterConfig = {
  field: 'status',
  operatorValueBlock: (params) => (
    <SelectOptionsOperatorValueBlock
      options={ALL_STATUSES_LIST}
      startAdornment={(option) => {
        const matchingStatus = statusMatcher(option.value);
        return <ColorDot color={matchingStatus.color} />;
      }}
      {...params}
    />
  ),
};

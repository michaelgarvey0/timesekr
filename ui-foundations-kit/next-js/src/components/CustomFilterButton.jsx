'use client';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import * as React from 'react';
import { HiX } from 'react-icons/hi';
import { EditFilterPopover } from '../components/NewCustomFilterButton';
import { FILTER_FIELDS } from '../core/filters';
import { useDisclosure } from '../hooks/useDisclosure';
export function CustomFilterButton({
  value,
  onRemove,
  onEdit,
  fieldType,
  operatorType,
  filterIndex,
  disabled,
  filterDefinition,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedField, setSelectedField] = React.useState(fieldType);
  const [selectedOperator, setSelectedOperator] = React.useState(operatorType);
  const [selectedValue, setSelectedValue] = React.useState(value);
  const editFilterDisclosure = useDisclosure();
  function applyNewFilter() {
    editFilterDisclosure.onClose();
    if (!selectedOperator) {
      throw new Error('No operator selected');
    }
    onEdit(
      {
        field: selectedField,
        operator: selectedOperator,
        value: selectedValue,
      },
      filterIndex,
    );
  }
  const incompleteFilter = !selectedOperator || !value;
  return (
    <>
      <Button
        size="small"
        variant="outlined"
        color="secondary"
        onClick={(event) => {
          setAnchorEl(event.currentTarget);
          editFilterDisclosure.onOpen();
        }}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          fontSize: 'xs',
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: 'gray.300',
          width: 'max-content',
          borderRadius: 1,
          backgroundColor: 'background.paper',
          px: 0.5,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          pl: 0.75,
          ...(incompleteFilter && {
            borderStyle: 'dashed',
            height: '30px',
          }),
        }}
      >
        {FILTER_FIELDS[fieldType].icon}
        <FilterLabel filterField={fieldType} />
        {operatorType && (
          <Box
            sx={{
              color: 'primary.700',
              letterSpacing: 0,
              lineHeight: 1,
              px: 0.25,
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
              gap: 0.5,
            }}
          >
            <FilterValue filterField={fieldType} operatorType={operatorType} value={value} />
          </Box>
        )}
        {operatorType && value && (
          <Tooltip title={disabled ? 'Must have at least one filter applied' : ''}>
            <Box>
              <IconButton
                onClick={(event) => {
                  event.stopPropagation();
                  onRemove({ field: fieldType, operator: operatorType, value });
                  // reset local state as well
                  setSelectedValue('');
                }}
                size="small"
                disabled={disabled}
                sx={{
                  padding: '3px',
                  height: '100%',
                  pointerEvents: 'all',
                  // hide this when the parent div has the class demo-dynamic-filters
                  '.demo-dynamic-filters &': {
                    visibility: 'hidden',
                    width: 0,
                  },
                }}
              >
                <HiX size={16} />
              </IconButton>
            </Box>
          </Tooltip>
        )}
      </Button>
      <EditFilterPopover
        anchorEl={anchorEl}
        selectedField={selectedField}
        setSelectedField={setSelectedField}
        selectedOperator={selectedOperator}
        setSelectedOperator={setSelectedOperator}
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
        disclosure={editFilterDisclosure}
        filterDefinition={filterDefinition}
        applyFilter={applyNewFilter}
        resetOnClose={false}
      />
    </>
  );
}
export function FilterLabel({ filterField, customSx, includeIcon = false }) {
  return (
    <Box
      sx={{
        px: 0.5,
        lineHeight: 1,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 0.25,
        color: 'gray.700',
        ...customSx,
      }}
    >
      {includeIcon && FILTER_FIELDS[filterField]?.icon}
      {FILTER_FIELDS[filterField]?.displayLabel}
    </Box>
  );
}
export function FilterValue({ filterField, operatorType, value, customSx }) {
  const contents = FILTER_FIELDS[filterField]?.valueRenderer;
  return (
    <Box
      sx={{
        // hide with ellipsis after 50ch
        maxWidth: '24ch',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        ...customSx,
      }}
    >
      {contents(value, operatorType)}
    </Box>
  );
}

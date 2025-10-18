import { Box, Button, Menu, MenuItem, Popover, Typography } from '@mui/material';
import * as React from 'react';
import { HiPlus } from 'react-icons/hi';

import { CustomFilterConfig } from '~/components/CustomFilterDefinitions';
import {
  FILTER_FIELDS,
  type CustomFilterFields,
  type CustomFilterOperators,
  type CustomFilterType,
} from '~/core/filters';
import { useDisclosure } from '~/hooks/useDisclosure';

export function NewCustomFilterButton({
  addNewFilter,
  disabled,
  availableFilters = [],
  placeholder,
}: {
  addNewFilter: (newFilter: CustomFilterType) => void;
  disabled?: boolean;
  availableFilters: CustomFilterConfig[];
  placeholder?: CustomFilterFields;
}) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [selectedField, setSelectedField] = React.useState<CustomFilterFields>('title');
  const [selectedOperator, setSelectedOperator] = React.useState<CustomFilterOperators | undefined>(
    undefined,
  );
  const [selectedValue, setSelectedValue] = React.useState<string | string[]>('');
  const selectFilterMenu = useDisclosure();
  const configureFilterPopover = useDisclosure();

  const placeholderLabel = placeholder ? FILTER_FIELDS[placeholder].displayLabel : undefined;

  function chooseFilter(filterName: CustomFilterFields) {
    setSelectedField(filterName);
    selectFilterMenu.onClose();
    configureFilterPopover.onOpen();
  }

  function applyFilter() {
    configureFilterPopover.onClose();
    if (!selectedOperator) {
      throw new Error('No operator selected');
    }
    addNewFilter({
      field: selectedField,
      operator: selectedOperator,
      value: selectedValue,
    });
    // reset the selected field, operator, and value
    setSelectedField('title');
    setSelectedOperator(undefined);
    setSelectedValue('');
  }

  const matchingDefinition = availableFilters?.find(
    (filterConfig) => filterConfig.field === selectedField,
  ) || {
    field: 'title',
    operatorValueBlock: () => <></>,
  };

  return (
    <>
      <Button
        data-tour={`new-filter-button-${placeholder || 'default'}`}
        sx={{
          height: '30px',
          minWidth: 'unset',
          // make it a dotted border
          borderRadius: 0.75,
          borderStyle: 'dashed',
          borderWidth: 1,
          borderColor: 'gray.300',
          fontSize: 'xs',
          gap: 0.5,
        }}
        color="secondary"
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
          setAnchorEl(event.currentTarget);
          if (placeholder) {
            setSelectedField(placeholder);
            configureFilterPopover.onOpen();
          } else {
            selectFilterMenu.onOpen();
          }
        }}
        size="medium"
        disabled={disabled}
      >
        <HiPlus size={12} />
        {placeholderLabel}
      </Button>
      <Menu
        open={selectFilterMenu.isOpen}
        onClose={selectFilterMenu.onClose}
        anchorEl={anchorEl}
        sx={{
          '.MuiPaper-root': {
            minWidth: 160,
          },
        }}
      >
        {availableFilters.map((filterConfig) => {
          return (
            <MenuItem
              key={filterConfig.field}
              dense
              onClick={() => chooseFilter(filterConfig.field)}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                gap: 1.5,
              }}
            >
              <FilterFieldMenuItem filterField={filterConfig.field} />
            </MenuItem>
          );
        })}
      </Menu>
      <EditFilterPopover
        disclosure={configureFilterPopover}
        filterDefinition={matchingDefinition}
        anchorEl={anchorEl}
        selectedField={selectedField}
        setSelectedField={setSelectedField}
        selectedOperator={selectedOperator}
        setSelectedOperator={setSelectedOperator}
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
        applyFilter={applyFilter}
      />
    </>
  );
}

export function EditFilterPopover({
  disclosure,
  filterDefinition,
  anchorEl,
  selectedField,
  setSelectedField,
  selectedOperator,
  setSelectedOperator,
  selectedValue,
  setSelectedValue,
  applyFilter,
  resetOnClose,
}: {
  disclosure: ReturnType<typeof useDisclosure>;
  filterDefinition: CustomFilterConfig | undefined;
  anchorEl: HTMLButtonElement | null;
  selectedField: CustomFilterFields;
  setSelectedField: (newField: CustomFilterFields) => void;
  selectedOperator: CustomFilterOperators | undefined;
  setSelectedOperator: (newOperator: CustomFilterOperators | undefined) => void;
  selectedValue: string | string[];
  setSelectedValue: (newValue: string | string[]) => void;
  applyFilter: () => void;
  resetOnClose?: boolean;
}) {
  // try to autofocus the filter when we open the popover, but forget React since it's not that bad if it fails
  React.useEffect(() => {
    const filterValueInput = document.querySelector(
      '[name="filterValue"]',
    ) as HTMLInputElement | null;
    if (filterValueInput && disclosure.isOpen) {
      // use the next tick in the event loop to focus the input
      setTimeout(() => {
        filterValueInput.focus();
      }, 0);
    }
  }, [disclosure.isOpen]);

  const OperatorValueBlock = filterDefinition?.operatorValueBlock?.({
    selectedOperator,
    setSelectedOperator,
    selectedValue,
    setSelectedValue,
  });

  return (
    <Popover
      id="new-filter-menu"
      open={disclosure.isOpen}
      disablePortal={true}
      anchorEl={anchorEl}
      onClose={async () => {
        disclosure.onClose();
        // reset the selected field, operator, and value, but give a brief delay so we don't see a flash
        if (resetOnClose) {
          await new Promise((resolve) => setTimeout(resolve, 200));
          setSelectedField('title');
          setSelectedOperator(undefined);
          setSelectedValue('');
        }
      }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      sx={{
        '.MuiPaper-root': {
          // offset a few pixels vertically
          boxShadow: 2,
          transform: 'translateY(4px) !important',
          borderRadius: 1.5,
        },
      }}
    >
      <Box
        id="new-filter-form"
        component="form"
        onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          event.stopPropagation();
          applyFilter();
        }}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          p: 1.5,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontSize: 'sm',
            fontWeight: 600,
            lineHeight: 1.25,
          }}
        >
          Filter by {FILTER_FIELDS[selectedField].displayLabel}{' '}
        </Typography>
        <Typography
          sx={{
            fontSize: 'xs',
            fontWeight: 400,
            lineHeight: 1.25,
            maxWidth: '45ch',
            color: 'gray.600',
          }}
        >
          {FILTER_FIELDS[selectedField]?.description || ''}
        </Typography>
        {disclosure.isOpen && OperatorValueBlock}
        {OperatorValueBlock && disclosure.isOpen && (
          <Button
            variant="contained"
            size="small"
            form="new-filter-form"
            type="submit"
            disabled={
              Array.isArray(selectedValue) ? selectedValue?.length === 0 : selectedValue === ''
            }
          >
            Add Filter
          </Button>
        )}
      </Box>
    </Popover>
  );
}

export function FilterFieldMenuItem({ filterField }: { filterField: CustomFilterFields }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 1.5,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 1,
        }}
      >
        {FILTER_FIELDS[filterField].icon}
        {FILTER_FIELDS[filterField].displayLabel}
      </Box>
    </Box>
  );
}

'use client'
import * as React from 'react';
import { CustomFilterType } from '~/core/filters';

// this hook can be extended and replaced with URL state, local storage, or a global state management library
export function useFilters() {
  const [filters, setFilters] = React.useState<CustomFilterType[]>([]);

  function addNewFilter(newFilter: CustomFilterType) {
    const newFiltersToSave = [...filters];
    newFiltersToSave.push(newFilter);
    setFilters(newFiltersToSave);
  }

  function removeFilter(filter: CustomFilterType) {
    setFilters((prevFilters) => prevFilters.filter((f) => f.field !== filter.field));
  }

  function editFilter(filter: CustomFilterType, index: number) {
    const newFilters = [...filters];
    newFilters[index] = filter;
    setFilters(newFilters);
  }

  return {
    filters: filters.filter(Boolean),
    setFilters,
    addNewFilter,
    removeFilter,
    editFilter,
  };
}

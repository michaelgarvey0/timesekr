import * as React from 'react';
// this hook can be extended and replaced with URL state, local storage, or a global state management library
export function useFilters() {
  const [filters, setFilters] = React.useState([]);
  function addNewFilter(newFilter) {
    const newFiltersToSave = [...filters];
    newFiltersToSave.push(newFilter);
    setFilters(newFiltersToSave);
  }
  function removeFilter(filter) {
    setFilters((prevFilters) => prevFilters.filter((f) => f.field !== filter.field));
  }
  function editFilter(filter, index) {
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

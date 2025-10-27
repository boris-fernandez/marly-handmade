// contexts/FilterContext.jsx
import { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

export function FilterProvider({ children }) {
  const [filters, setFilters] = useState({
    materials: [],
    productTypes: [],
    priceRange: { min: '', max: '' },
    sortBy: 'best-selling'
  });

  const updateFilter = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const clearFilters = () => {
    setFilters({
      materials: [],
      productTypes: [],
      priceRange: { min: '', max: '' },
      sortBy: 'best-selling'
    });
  };

  return (
    <FilterContext.Provider value={{ filters, updateFilter, clearFilters }}>
      {children}
    </FilterContext.Provider>
  );
}

export const useFilters = () => useContext(FilterContext);
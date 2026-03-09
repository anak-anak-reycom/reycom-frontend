// app/components/navbar/FilterContext.tsx
"use client";

import React, { createContext, useContext, useState } from "react";

type FilterState = {
  search: string;
  categories: number[]; 
  jobTypes: string[];     
};

type FilterContextValue = {
  filters: FilterState;
  setSearch: (s: string) => void;
  toggleCategoryId: (id: number) => void;
  toggleJobTypeId: (id: string) => void;
  setFilters: (f: Partial<FilterState>) => void;
  clearFilters: () => void;
};

const defaults: FilterState = { search: "", categories: [], jobTypes: [] };
const FilterCtx = createContext<FilterContextValue | null>(null);

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFiltersState] = useState<FilterState>(defaults);

  const setSearch = (s: string) => setFiltersState((p) => ({ ...p, search: s }));
  const toggleCategoryId = (id: number) =>
    setFiltersState((p) => {
      const set = new Set(p.categories);
      if (set.has(id)) set.delete(id); else set.add(id);
      return { ...p, categories: Array.from(set) };
    });
  const toggleJobTypeId = (id: string) =>
    setFiltersState((p) => {
      const set = new Set(p.jobTypes);
      if (set.has(id)) set.delete(id); else set.add(id);
      return { ...p, jobTypes: Array.from(set) };
    });

  const setFilters = (f: Partial<FilterState>) => setFiltersState((p) => ({ ...p, ...f }));
  const clearFilters = () => setFiltersState(defaults);

  return (
    <FilterCtx.Provider value={{ filters, setSearch, toggleCategoryId, toggleJobTypeId, setFilters, clearFilters }}>
      {children}
    </FilterCtx.Provider>
  );
}

export function useFilterContext() {
  const ctx = useContext(FilterCtx);
  if (!ctx) throw new Error("useFilterContext must be used inside FilterProvider");
  return ctx;
}
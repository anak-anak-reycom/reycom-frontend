// components/sidebars/CategorySidebar.tsx
"use client";

import React, { useMemo, useState } from "react";
import { Layout } from "antd";
import { Search } from "lucide-react";
import { getAllCategory } from "@/app/data/category";

const { Sider } = Layout;

export type Category = { id: number; nameCategory: string };
export type JobTypeItem = { id: string; label: string };

export type CategorySidebarProps = {
  categories?: Category[]; 
  jobTypes?: JobTypeItem[]; 
  collapsed?: boolean;
  onChange?: (payload: { search: string; categories: number[]; jobTypes: string[] }) => void;
};

export default function CategorySidebar({
  categories = [],
  jobTypes = [
    { id: "fulltime", label: "Full Time" },
    { id: "parttime", label: "Part Time" },
  ],
  collapsed = false,
  onChange,
}: CategorySidebarProps) {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<Set<number>>(new Set());
  const [selectedJobTypes, setSelectedJobTypes] = useState<Set<string>>(new Set());

  // memoized filtered categories by search
  const filteredCategories = useMemo(() => {
    if (!search.trim()) return categories;
    const q = search.trim().toLowerCase();
    return categories.filter((c) => c.nameCategory.toLowerCase().includes(q));
  }, [categories, search]);

  const toggleCategory = (id: number) => {
    setSelectedCategories((prev) => {
      const copy = new Set(prev);
      if (copy.has(id)) copy.delete(id);
      else copy.add(id);
      const arr = Array.from(copy);
      onChange?.({ search, categories: arr, jobTypes: Array.from(selectedJobTypes) });
      return copy;
    });
  };

  const toggleJobType = (id: string) => {
    setSelectedJobTypes((prev) => {
      const copy = new Set(prev);
      if (copy.has(id)) copy.delete(id);
      else copy.add(id);
      const arr = Array.from(copy);
      onChange?.({ search, categories: Array.from(selectedCategories), jobTypes: arr });
      return copy;
    });
  };

  const handleSearchChange = (v: string) => {
    setSearch(v);
    onChange?.({ search: v, categories: Array.from(selectedCategories), jobTypes: Array.from(selectedJobTypes) });
  };

  // small helper render circle checkbox
  function CircleCheck({ checked }: { checked: boolean }) {
    return (
      <span
        aria-hidden
        className={`w-9 h-9 rounded-full flex items-center justify-center border-2 ${
          checked ? "bg-blue-700 border-blue-700" : "border-blue-600/80"
        }`}
      >
        {/* inner dot when checked */}
        {checked ? <span className="w-3 h-3 rounded-full bg-white" /> : null}
      </span>
    );
  }

  return (
    <Sider
      width={280}
      collapsedWidth={80}
      breakpoint="lg"
      collapsible
      collapsed={collapsed}
      trigger={null}
      style={{ background: "transparent" }}
      className="!border-none px-4 py-6"
    >
      <div className="space-y-6">
        {/* Search */}
        <div>
          <div className="relative">
            <input
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Find Ur Job"
              className="w-full pl-4 pr-10 py-3 rounded-2xl border border-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={16} />
            </span>
          </div>
        </div>

        {/* Category list */}
        <div>
          <h4 className="text-lg font-medium mb-4">Category</h4>

          <div className="space-y-4">
            {filteredCategories.length === 0 ? (
              <div className="text-sm text-gray-500">No categories</div>
            ) : (
              filteredCategories.map((cat) => {
                const checked = selectedCategories.has(cat.id);
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => toggleCategory(cat.id)}
                    className="w-full flex items-center gap-4 text-left hover:opacity-90"
                    aria-pressed={checked}
                    aria-label={`Toggle category ${cat.nameCategory}`}
                  >
                    <CircleCheck checked={checked} />
                    <span className="text-base">{cat.nameCategory}</span>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Job Type */}
        <div>
          <h4 className="text-lg font-medium mb-4">Job Type</h4>

          <div className="space-y-4">
            {jobTypes.map((jt) => {
              const checked = selectedJobTypes.has(jt.id);
              return (
                <button
                  key={jt.id}
                  type="button"
                  onClick={() => toggleJobType(jt.id)}
                  className="w-full flex items-center gap-4 text-left hover:opacity-90"
                >
                  <CircleCheck checked={checked} />
                  <span className="text-base">{jt.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </Sider>
  );
}
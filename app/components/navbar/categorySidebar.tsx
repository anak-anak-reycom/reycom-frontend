"use client";

import React, { useMemo, useState, useEffect } from "react";
import { Layout } from "antd";
import { Search, Check, Menu as MenuIcon, X as XIcon } from "lucide-react";
import { usePathname } from "next/navigation";

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
  categories = [
    { id: 1, nameCategory: "Admin" },
    { id: 2, nameCategory: "IT" },
    { id: 3, nameCategory: "Marketing" }
  ],
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
  const [mobileOpen, setMobileOpen] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
   
    const body = document.body;
    if (mobileOpen) body.style.overflow = "hidden";
    else body.style.overflow = "";
    return () => {
      body.style.overflow = "";
    };
  }, [mobileOpen]);

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

  function RectangleCheck({ checked }: { checked: boolean }) {
    const primary = "#1f5f84";
    return (
      <span
        aria-hidden
        className={`flex items-center justify-center transition-all duration-150 select-none w-8 h-8 rounded-lg`}
        style={{
          borderWidth: 3.5,
          borderStyle: "solid",
          borderColor: checked ? primary : "rgba(31,95,132,0.9)",
          background: checked ? primary : "#ffffff",
        }}
      >
        {checked ? <Check size={16} color="#fff" /> : null}
      </span>
    );
  }

 //------------------------SIDEBAR LAYOUT-------------------------------------//
  const sidebarContent = (
    <div className="space-y-6 p-4">
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

        <div className="space-y-3">
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
                  className="w-full flex items-center gap-3 text-left hover:opacity-95 py-1"
                  aria-pressed={checked}
                  aria-label={`Toggle category ${cat.nameCategory}`}
                >
                  <RectangleCheck checked={checked} />
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

        <div className="space-y-3">
          {jobTypes.map((jt) => {
            const checked = selectedJobTypes.has(jt.id);
            return (
              <button
                key={jt.id}
                type="button"
                onClick={() => toggleJobType(jt.id)}
                className="w-full flex items-center gap-3 text-left hover:opacity-95 py-1"
                aria-pressed={checked}
              >
                <RectangleCheck checked={checked} />
                <span className="text-base">{jt.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <>
      
      <Sider
        width={280}
        collapsedWidth={80}
        breakpoint="lg"
        collapsible
        collapsed={collapsed}
        trigger={null}
        style={{ background: "white" }}
        className="!border-none px-4 py-6 hidden lg:block"
      >
        {sidebarContent}
      </Sider>

      
      {!collapsed && !mobileOpen && (
        <button
          aria-label="Open filters"
          className="lg:hidden fixed z-50 flex items-center gap-2 bg-white rounded-b-md px-3 py-2"
          onClick={() => setMobileOpen(true)}
        >
          <MenuIcon size={18} />
        </button>
      )}
  
      
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-transform ${
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}
      >
        
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity ${mobileOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setMobileOpen(false)}
        />

      
        <div
          className={`absolute left-0 top-0 h-full w-full max-w-xs bg-white shadow-xl transform transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <div className="text-lg font-semibold">Filters</div>
            <button aria-label="Close filters" onClick={() => setMobileOpen(false)} className="p-2 rounded-md">
              <XIcon size={18} />
            </button>
          </div>

          <div className="overflow-auto h-full">
            {sidebarContent}
          </div>
        </div>
      </div>

    </>
  );
}
// app/components/navbar/categorySidebar.tsx
"use client";

import React, { useMemo, useState, useEffect } from "react";
import { Layout } from "antd";
import { Search, Check, Menu as MenuIcon, X as XIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const { Sider } = Layout;

export type Category = { id: number; nameCategory: string };
export type JobTypeItem = { id: string; label: string };

export type CategorySidebarProps = {
  categories?: Category[];
  jobTypes?: JobTypeItem[];
  collapsed?: boolean;
};

function normalizeName(n?: string) {
  if (!n) return "";
  const s = String(n).toLowerCase();
  if (s.includes("admin")) return "Admin";
  if (s.includes("it")) return "IT";
  if (s.includes("market")) return "Marketing";
  return n.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

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
}: CategorySidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Local UI state for check visuals; initial values read from URL
  const initialSearch = (searchParams?.get("search") ?? "") as string;
  const initialCats = (searchParams?.get("cats") ?? "") ? (searchParams!.get("cats")!.split(",").map(decodeURIComponent)) : [];
  const initialJobTypes = (searchParams?.get("jobTypes") ?? "") ? searchParams!.get("jobTypes")!.split(",") : [];

  const [search, setSearch] = useState(initialSearch);
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set(initialCats));
  const [selectedJobTypes, setSelectedJobTypes] = useState<Set<string>>(new Set(initialJobTypes));
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const body = document.body;
    if (mobileOpen) body.style.overflow = "hidden";
    else body.style.overflow = "";
    return () => { body.style.overflow = ""; };
  }, [mobileOpen]);

  const filteredCategories = useMemo(() => {
    if (!search.trim()) return categories;
    const q = search.trim().toLowerCase();
    return categories.filter((c) => c.nameCategory.toLowerCase().includes(q));
  }, [categories, search]);

  // helper to update URL query params (keeps pathname)
  function updateQueryParams(nextSearch: string, cats: string[], jobTypesArr: string[]) {
    const url = new URL(window.location.href);
    const params = url.searchParams;

    if (nextSearch) params.set("search", nextSearch);
    else params.delete("search");

    if (cats && cats.length) {
      params.set("cats", cats.map(encodeURIComponent).join(","));
    } else {
      params.delete("cats");
    }

    if (jobTypesArr && jobTypesArr.length) {
      params.set("jobTypes", jobTypesArr.join(","));
    } else {
      params.delete("jobTypes");
    }

    // push shallow so we don't fully navigate; app-router accepts full URL string
    const href = `${url.pathname}?${params.toString()}`;
    router.replace(href, { scroll: false }); // replace to avoid pushing history too much
  }

  const toggleCategory = (rawName: string) => {
    const norm = normalizeName(rawName);
    setSelectedCategories(prev => {
      const copy = new Set(prev);
      if (copy.has(norm)) copy.delete(norm);
      else copy.add(norm);
      // update URL
      updateQueryParams(search, Array.from(copy), Array.from(selectedJobTypes));
      return copy;
    });
  };

  const toggleJobType = (id: string) => {
    setSelectedJobTypes(prev => {
      const copy = new Set(prev);
      if (copy.has(id)) copy.delete(id);
      else copy.add(id);
      updateQueryParams(search, Array.from(selectedCategories), Array.from(copy));
      return copy;
    });
  };

  const handleSearchChange = (v: string) => {
    setSearch(v);
    updateQueryParams(v, Array.from(selectedCategories), Array.from(selectedJobTypes));
  };

  function RectangleCheck({ checked }: { checked: boolean }) {
    const primary = "#1f5f84";
    return (
      <span aria-hidden className={`flex items-center justify-center transition-all duration-150 select-none w-8 h-8 rounded-lg`}
            style={{
              borderWidth: 3.5,
              borderStyle: "solid",
              borderColor: checked ? primary : "rgba(31,95,132,0.9)",
              background: checked ? primary : "#ffffff",
            }}>
        {checked ? <Check size={16} color="#fff" /> : null}
      </span>
    );
  }

  const sidebarContent = (
    <div className="space-y-6 p-4">
      <div>
        <div className="relative">
          <input value={search} onChange={(e) => handleSearchChange(e.target.value)} placeholder="Find Ur Job"
                 className="w-full pl-4 pr-10 py-3 rounded-2xl border border-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white" />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Search size={16} />
          </span>
        </div>
      </div>

      <div>
        <h4 className="text-lg font-medium mb-4 font-sans">Category</h4>
        <div className="space-y-3">
          {filteredCategories.length === 0 ? (
            <div className="text-sm text-gray-500">No categories</div>
          ) : (
            filteredCategories.map((cat) => {
              const norm = normalizeName(cat.nameCategory);
              const checked = selectedCategories.has(norm);
              return (
                <button key={cat.id} type="button" onClick={() => toggleCategory(cat.nameCategory)}
                        className="w-full flex items-center gap-3 text-left hover:opacity-95 py-1 font-sans"
                        aria-pressed={checked} aria-label={`Toggle category ${cat.nameCategory}`}>
                  <RectangleCheck checked={checked} />
                  <span className="text-base font-sans">{cat.nameCategory}</span>
                </button>
              );
            })
          )}
        </div>
      </div>

      <div>
        <h4 className="text-lg font-medium mb-4">Job Type</h4>
        <div className="space-y-3">
          {jobTypes.map((jt) => {
            const checked = selectedJobTypes.has(jt.id);
            return (
              <button key={jt.id} type="button" onClick={() => toggleJobType(jt.id)}
                      className="w-full flex items-center gap-3 text-left hover:opacity-95 py-1"
                      aria-pressed={checked}>
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
      <Sider width={280} collapsedWidth={80} breakpoint="lg" collapsible collapsed={collapsed} trigger={null}
             style={{ background: "white" }} className="!border-none px-4 py-6 hidden lg:block">
        {sidebarContent}
      </Sider>

      {!collapsed && !mobileOpen && (
        <button aria-label="Open filters" className="lg:hidden fixed z-50 flex items-center gap-2 bg-white rounded-b-md px-3 py-2"
                onClick={() => setMobileOpen(true)}>
          <MenuIcon size={18} />
        </button>
      )}

      <div className={`fixed inset-0 z-40 lg:hidden transition-transform ${mobileOpen ? "pointer-events-auto" : "pointer-events-none"}`}
           aria-hidden={!mobileOpen}>
        <div className={`absolute inset-0 bg-black/40 transition-opacity ${mobileOpen ? "opacity-100" : "opacity-0"}`} onClick={() => setMobileOpen(false)} />

        <div className={`absolute left-0 top-0 h-full w-full max-w-xs bg-white shadow-xl transform transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="flex items-center justify-between p-4 border-b">
            <div className="text-lg font-semibold">Filters</div>
            <button aria-label="Close filters" onClick={() => setMobileOpen(false)} className="p-2 rounded-md">
              <XIcon size={18} />
            </button>
          </div>

          <div className="overflow-auto h-full">{sidebarContent}</div>
        </div>
      </div>
    </>
  );
}
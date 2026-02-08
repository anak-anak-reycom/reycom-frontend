// app/components/contact/BranchSearch.tsx
"use client";

import React from "react";
import { Input } from "antd";

const { Search } = Input;

type Props = {
  value?: string;
  onSearch?: (v: string) => void;
  className?: string;
};

export default function BranchSearch({ value = "", onSearch, className }: Props) {
  return (
    <div className={className}>
      <div className="max-w-md mx-auto">
        <Search
          placeholder="Search Branch"
          value={value}
          allowClear
          enterButton
          onSearch={(v) => onSearch?.(v)}
          onChange={(e) => onSearch?.(e.target.value)}
        />
      </div>
    </div>
  );
}

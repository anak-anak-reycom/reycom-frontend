// app/components/contact/CompanyDirectory.tsx
"use client";

import React from "react";

export default function CompanyDirectory() {
  return (
    <section className="w-full">
      <div className="max-w-[1400px] grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mx-auto px-6 py-20">
        <div className="lg:col-span-2 text-center">
          <h1 className="text-3xl font-semibold mb-2">Company Directory</h1>
          <p className="text-gray-600 mb-6">Find us in your neck of the woods</p>
        </div>
      </div>
    </section>
  );
}

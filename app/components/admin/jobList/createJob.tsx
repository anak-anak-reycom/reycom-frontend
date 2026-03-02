// components/CreateJobForm.tsx
'use client';

import React, { useEffect, useState } from "react";
import axios from "axios";
import type { CategoryItem } from "@/app/types/category-types";

type Props = {
  onCreated?: () => void;
};

export default function CreateJobForm({ onCreated }: Props) {
  const BASE_API = process.env.NEXT_PUBLIC_BASE_API ?? "";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // raw categories from backend (we use this only to map names+types -> id_category)
  const [rawCategories, setRawCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(false);

  // frontend-only lists (fixed)
  const categoryNames = ["Admin", "IT", "Marketing"];
  const jobTypeLabels = ["Full Time", "Part Time"];

  // selections
  const [selectedCategoryNames, setSelectedCategoryNames] = useState<Set<string>>(new Set());
  const [selectedJobTypes, setSelectedJobTypes] = useState<Set<string>>(new Set());

  // responsibilities / requirements
  const [responsibilities, setResponsibilities] = useState<string[]>([""]);
  const [requirements, setRequirements] = useState<string[]>([""]);

  const [creating, setCreating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // styles
  const inputClass = "w-full rounded-full border-2 border-gray-300 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#214B62]";
  const textareaClass = "w-full rounded-xl border-2 border-gray-300 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#214B62] min-h-[120px]";
  const labelClass = "block mb-2 font-medium";

  // load raw categories to be able to map to IDs
  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${BASE_API}/category`);
        const payload = res.data?.data ?? res.data;
        const arr = Array.isArray(payload) ? payload : [];
        if (!mounted) return;

        const normalized: CategoryItem[] = arr.map((r: any) => ({
          id_category: Number(r?.id_category ?? r?.id ?? 0),
          name_category: String(r?.name_category ?? r?.nameCategory ?? ""),
          job_type: String(r?.job_type ?? r?.jobType ?? ""),
          created_at: r?.created_at ? new Date(r.created_at) : new Date(),
          updated_at: r?.updated_at ? new Date(r.updated_at) : new Date(),
        }));

        setRawCategories(normalized);
      } catch (err: any) {
        console.error("Failed to load categories", err);
        setErrorMessage(err?.response?.data?.message ?? err?.message ?? "Failed to load categories");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [BASE_API]);

  // helpers for dynamic lists
  const setResponsibilityAt = (idx: number, value: string) => setResponsibilities((prev) => prev.map((v, i) => (i === idx ? value : v)));
  const addResponsibility = () => setResponsibilities((p) => [...p, ""]);
  const removeResponsibility = (idx: number) => setResponsibilities((p) => p.filter((_, i) => i !== idx));

  const setRequirementAt = (idx: number, value: string) => setRequirements((prev) => prev.map((v, i) => (i === idx ? value : v)));
  const addRequirement = () => setRequirements((p) => [...p, ""]);
  const removeRequirement = (idx: number) => setRequirements((p) => p.filter((_, i) => i !== idx));

  // toggles
  const toggleCategoryName = (name: string) => {
    setSelectedCategoryNames((prev) => {
      const copy = new Set(prev);
      if (copy.has(name)) copy.delete(name);
      else copy.add(name);
      return copy;
    });
  };

  const toggleJobType = (jt: string) => {
    setSelectedJobTypes((prev) => {
      const copy = new Set(prev);
      if (copy.has(jt)) copy.delete(jt);
      else copy.add(jt);
      return copy;
    });
  };

  // mapping function: for frontendName + jobType -> find id_category in rawCategories
  function findCategoryIdForPair(frontendName: string, jobType: string): number | null {
    const lowerName = frontendName.toLowerCase();
    const lowerType = jobType.toLowerCase();

    // Prefer exact match on name (case-insensitive), otherwise use includes
    for (const r of rawCategories) {
      const backendName = (r.name_category ?? "").toLowerCase();
      const backendType = (r.job_type ?? "").toLowerCase();
      if (backendType !== lowerType) continue;
      if (backendName === lowerName) return Number(r.id_category);
    }
    for (const r of rawCategories) {
      const backendName = (r.name_category ?? "").toLowerCase();
      const backendType = (r.job_type ?? "").toLowerCase();
      if (backendType !== lowerType) continue;
      if (backendName.includes(lowerName)) return Number(r.id_category);
    }
    return null;
  }

  // submit handler (send single categoryId per your latest instruction)
  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!title.trim()) { setErrorMessage("Job title is required"); return; }
    if (selectedCategoryNames.size === 0) { setErrorMessage("Please select at least one category"); return; }
    if (selectedJobTypes.size === 0) { setErrorMessage("Please select at least one job type"); return; }

    setCreating(true);

    try {
      const firstCategory = Array.from(selectedCategoryNames)[0];
      const firstJobType = Array.from(selectedJobTypes)[0];
      const foundId = findCategoryIdForPair(firstCategory, firstJobType);

      if (!foundId) {
        setErrorMessage(
          `Backend missing category-type pair: ${firstCategory} - ${firstJobType}. Please create that entry in backend or choose another combination.`
        );
        setCreating(false);
        return;
      }

      if (selectedCategoryNames.size > 1 || selectedJobTypes.size > 1) {
        setSuccessMessage(`Multiple selections detected — sending only: ${firstCategory} - ${firstJobType}`);
        setTimeout(() => setSuccessMessage(null), 2200);
      }

      const responsibilitiesClean = responsibilities.map(r => r.trim()).filter(Boolean).join(",");
      const requirementsClean = requirements.map(r => r.trim()).filter(Boolean).join(",");

      const jobPayload: any = {
        jobName: title.trim(),
        jobDate: new Date().toISOString(),
        jobDescription: description.trim() || null,
        jobResponbilities: responsibilitiesClean || null,
        jobRequirement: requirementsClean || null,
        categoryId: foundId, // single id
      };

      console.debug("Job payload ->", jobPayload);

      const resJob = await axios.post(`${BASE_API}/career`, jobPayload, {
        headers: { "Content-Type": "application/json" },
      });

      const createdJob = resJob.data?.data ?? resJob.data;
      setSuccessMessage("Job created successfully");
      // reset
      setTitle("");
      setDescription("");
      setResponsibilities([""]);
      setRequirements([""]);
      setSelectedCategoryNames(new Set());
      setSelectedJobTypes(new Set());
      onCreated?.();
    } catch (err: any) {
      console.error("create job failed", err);
      const srv = err?.response?.data;
      let message = "Failed to create job";
      if (srv) {
        if (typeof srv === "string") message = srv;
        else if (srv.message) message = srv.message;
        else message = JSON.stringify(srv);
      } else if (err?.message) message = err.message;
      setErrorMessage(message);
    } finally {
      setCreating(false);
      setTimeout(() => setSuccessMessage(null), 2500);
    }
  };

  const isCheckedCategory = (name: string) => selectedCategoryNames.has(name);
  const isCheckedJobType = (label: string) => selectedJobTypes.has(label);

  return (
    <section className="flex justify-center py-8">
      <form className="w-full max-w-[900px] px-4" onSubmit={handleSubmit}>
        {errorMessage && <div className="mb-4 text-sm text-red-600">{errorMessage}</div>}
        {successMessage && <div className="mb-4 text-sm text-green-600">{successMessage}</div>}

        {/* Job title */}
        <div className="mb-4">
          <label className={labelClass}>Job Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Backend Developer" className={inputClass} />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className={labelClass}>Job Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="Short description for card view (optional)" className={textareaClass} />
        </div>

        {/* Categories checklist (frontend only list) */}
        <div className="mb-4">
          <label className={labelClass}>Categories (choose one or more)</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {loading ? <div className="text-sm text-gray-500">Loading mapping data...</div> : categoryNames.map((name) => (
              <button key={name} type="button" onClick={() => toggleCategoryName(name)} className={`flex items-center gap-3 px-3 py-2 rounded-lg border ${isCheckedCategory(name) ? "bg-[#214B62] text-white border-[#214B62]" : "bg-white text-black border-gray-200"}`}>
                <span className={`w-4 h-4 rounded-full border ${isCheckedCategory(name) ? "bg-white" : "bg-transparent"}`} />
                <span className="text-sm">{name}</span>
              </button>
            ))}
          </div>
          <div className="text-xs text-gray-500 mt-2">Frontend uses name matching (e.g. "Admins" in backend maps to "Admin").</div>
        </div>

        {/* Job types checklist (frontend only list) */}
        <div className="mb-4">
          <label className={labelClass}>Job Types (choose one or more)</label>
          <div className="flex gap-3 flex-wrap">
            {jobTypeLabels.map((jt) => (
              <button key={jt} type="button" onClick={() => toggleJobType(jt)} className={`flex items-center gap-3 px-3 py-2 rounded-lg border ${isCheckedJobType(jt) ? "bg-[#214B62] text-white border-[#214B62]" : "bg-white text-black border-gray-200"}`}>
                <span className={`w-4 h-4 rounded-full border ${isCheckedJobType(jt) ? "bg-white" : "bg-transparent"}`} />
                <span className="text-sm">{jt}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Responsibilities */}
        <div className="mb-4">
          <label className={labelClass}>Responsibilities</label>
          <div className="space-y-2">
            {responsibilities.map((r, i) => (
              <div key={i} className="flex gap-2">
                <input value={r} onChange={(e) => setResponsibilityAt(i, e.target.value)} placeholder={`Responsibility ${i+1}`} className="flex-1 rounded-md border px-3 py-2" />
                <button type="button" onClick={() => removeResponsibility(i)} className="px-3 py-1 text-sm text-red-600 border rounded">&times;</button>
              </div>
            ))}
            <div>
              <button type="button" onClick={addResponsibility} className="text-sm text-blue-600">+ Add responsibility</button>
            </div>
          </div>
        </div>

        {/* Requirements */}
        <div className="mb-4">
          <label className={labelClass}>Job Requirements</label>
          <div className="space-y-2">
            {requirements.map((r, i) => (
              <div key={i} className="flex gap-2">
                <input value={r} onChange={(e) => setRequirementAt(i, e.target.value)} placeholder={`Requirement ${i+1}`} className="flex-1 rounded-md border px-3 py-2" />
                <button type="button" onClick={() => removeRequirement(i)} className="px-3 py-1 text-sm text-red-600 border rounded">&times;</button>
              </div>
            ))}
            <div>
              <button type="button" onClick={addRequirement} className="text-sm text-blue-600">+ Add requirement</button>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-3">
          <div className="flex gap-3">
            <button type="submit" disabled={creating} className="w-full rounded-lg bg-[#214B62] text-white py-3">{creating ? "Creating..." : "Create Job"}</button>
            <button type="button" onClick={() => {
              setTitle(""); setDescription(""); setResponsibilities([""]); setRequirements([""]); setSelectedCategoryNames(new Set()); setSelectedJobTypes(new Set());
            }} className="rounded-lg border px-4 py-3">Reset</button>
          </div>
        </div>
      </form>
    </section>
  );
}
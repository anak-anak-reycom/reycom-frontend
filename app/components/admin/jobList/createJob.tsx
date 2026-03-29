// components/CreateJobForm.tsx
'use client';

import React, { useEffect, useState } from "react";
import axios from "axios";
import type { CategoryItem } from "@/app/types/category-types";

type Props = { onCreated?: () => void };

export default function CreateJobForm({ onCreated }: Props) {
  const BASE_API = process.env.NEXT_PUBLIC_BASE_API ?? "";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [responsibilities, setResponsibilities] = useState<string[]>([""]);
  const [requirements, setRequirements] = useState<string[]>([""]);

  const [rawCategories, setRawCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(false);

  const categoriesList = [
    { id: "admin", label: "Admin" },
    { id: "it", label: "IT" },
    { id: "marketing", label: "Marketing" },
  ];
  const jobTypesList = [
    { id: "full_time", label: "Full Time" },
    { id: "part_time", label: "Part Time" },
  ];

  const [selectedCategoryKey, setSelectedCategoryKey] = useState<string | null>(null);
  const [selectedJobTypeKey, setSelectedJobTypeKey] = useState<string | null>(null);

  const [creating, setCreating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const inputClass = "w-full rounded-full border-2 border-gray-300 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#214B62]";
  const textareaClass = "w-full rounded-xl border-2 border-gray-300 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#214B62] min-h-[120px]";
  const labelClass = "block mb-2 font-medium";

  // computed totals untuk counter
  const respTotal = responsibilities.map(r => r.trim()).filter(Boolean).join(",").length;
  const reqTotal = requirements.map(r => r.trim()).filter(Boolean).join(",").length;

  function normalizeJobType(s: string | null | undefined) {
    if (!s) return "";
    const low = String(s).toLowerCase();
    if (low.includes("full")) return "full time";
    if (low.includes("part")) return "part time";
    return low;
  }

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
          id_category: Number(r?.idCategory ?? r?.id_category ?? r?.id ?? 0),
          name_category: String(r?.nameCategory ?? r?.name_category ?? r?.name ?? ""),
          job_type: String(r?.jobType ?? r?.job_type ?? ""),
          created_at: r?.createdAt ?? r?.created_at ?? new Date(),
          updated_at: r?.updatedAt ?? r?.updated_at ?? new Date(),
        }));
        setRawCategories(normalized);
      } catch (err: any) {
        setErrorMessage(err?.response?.data?.message ?? err?.message ?? "Failed to load categories");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [BASE_API]);

  const rowsMatchingFrontendCategory = (frontendKey: string) => {
    const label = (categoriesList.find(c => c.id === frontendKey)?.label ?? "").toLowerCase();
    return rawCategories.filter(r => {
      const backend = (r.name_category ?? "").toLowerCase();
      if (!backend) return false;
      if (backend === label) return true;
      if (backend.includes(label)) return true;
      if (label.includes(backend)) return true;
      return backend.split(/[^a-z0-9]+/).filter(Boolean).some(t => t === label);
    });
  };

  const rowsMatchingJobType = (jobTypeKey: string) => {
    const label = (jobTypesList.find(j => j.id === jobTypeKey)?.label ?? "").toLowerCase();
    return rawCategories.filter(r => normalizeJobType(r.job_type) === normalizeJobType(label));
  };

  const resolveCategoryIdWithDebug = (): { id: number | null; debugText: string; candidates?: CategoryItem[] } => {
    if (!selectedCategoryKey && !selectedJobTypeKey)
      return { id: null, debugText: "No selection (need category + job type)" };

    const catRows = selectedCategoryKey ? rowsMatchingFrontendCategory(selectedCategoryKey) : null;
    const jtRows = selectedJobTypeKey ? rowsMatchingJobType(selectedJobTypeKey) : null;

    if (catRows && jtRows) {
      const filtered = catRows.filter(r =>
        normalizeJobType(r.job_type) === normalizeJobType(jobTypesList.find(j => j.id === selectedJobTypeKey)!.label)
      );
      if (filtered.length === 1) return { id: filtered[0].id_category, debugText: "OK", candidates: filtered };
      if (filtered.length > 1) return { id: null, debugText: `Ambiguous: ${filtered.map(f => f.id_category).join(", ")}`, candidates: filtered };
      return { id: null, debugText: "No candidate matches both category+jobType" };
    }
    if (catRows && !jtRows) {
      if (catRows.length === 1) return { id: catRows[0].id_category, debugText: "OK", candidates: catRows };
      return { id: null, debugText: `Category ambiguous: ${catRows.map(r => r.id_category).join(", ")}` };
    }
    if (!catRows && jtRows) {
      if (jtRows.length === 1) return { id: jtRows[0].id_category, debugText: "OK", candidates: jtRows };
      return { id: null, debugText: `JobType ambiguous: ${jtRows.map(r => r.id_category).join(", ")}` };
    }
    return { id: null, debugText: "Unknown state" };
  };

  const setResponsibilityAt = (idx: number, v: string) => setResponsibilities(prev => prev.map((x, i) => i === idx ? v : x));
  const addResponsibility = () => setResponsibilities(p => [...p, ""]);
  const removeResponsibility = (idx: number) => setResponsibilities(p => p.filter((_, i) => i !== idx));
  const setRequirementAt = (idx: number, v: string) => setRequirements(prev => prev.map((x, i) => i === idx ? v : x));
  const addRequirement = () => setRequirements(p => [...p, ""]);
  const removeRequirement = (idx: number) => setRequirements(p => p.filter((_, i) => i !== idx));

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage(null);
    setInfoMessage(null);
    setSuccessMessage(null);

    if (!title.trim()) { setErrorMessage("Job title is required"); return; }
    if (title.trim().length > 50) { setErrorMessage("Job title max 50 characters"); return; }
    if (description.trim().length > 200) { setErrorMessage(`Job description too long (${description.trim().length}/200 chars)`); return; }
    if (respTotal > 800) { setErrorMessage(`Responsibilities too long (${respTotal}/800 chars)`); return; }
    if (reqTotal > 200) { setErrorMessage(`Requirements too long (${reqTotal}/200 chars)`); return; }

    const resolved = resolveCategoryIdWithDebug();
    if (!resolved.id) { setErrorMessage(resolved.debugText || "Cannot resolve categoryId"); return; }

    const responsibilitiesClean = responsibilities.map(r => r.trim()).filter(Boolean).join(",");
    const requirementsClean = requirements.map(r => r.trim()).filter(Boolean).join(",");

    setCreating(true);
    try {
      const jobPayload: Record<string, any> = {
        jobName: title.trim(),
        jobDate: new Date().toISOString(),
        categoryId: Number(resolved.id),
      };
      if (description.trim()) jobPayload.jobDescription = description.trim();
      if (responsibilitiesClean) jobPayload.jobResponbilities = responsibilitiesClean;
      if (requirementsClean) jobPayload.jobRequirement = requirementsClean;

      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      await axios.post(`${BASE_API}/career`, jobPayload, {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      setSuccessMessage("Job created successfully");
      setTitle(""); setDescription(""); setResponsibilities([""]); setRequirements([""]);
      setSelectedCategoryKey(null); setSelectedJobTypeKey(null);
      onCreated?.();
    } catch (err: any) {
      const srv = err?.response?.data;
      let message = "Failed to create job";
      if (srv) {
        if (srv.message) message = String(srv.message);
        else if (srv.errors) message = JSON.stringify(srv.errors);
        else message = JSON.stringify(srv);
      } else if (err?.message) message = err.message;
      setErrorMessage(message);
    } finally {
      setCreating(false);
      setTimeout(() => setSuccessMessage(null), 2500);
    }
  };

  const isCatSelected = (k: string) => selectedCategoryKey === k;
  const isJobTypeSelected = (k: string) => selectedJobTypeKey === k;

  const debugCandidates = () => {
    if (!rawCategories.length) return null;
    const catRows = selectedCategoryKey ? rowsMatchingFrontendCategory(selectedCategoryKey) : null;
    const jtRows = selectedJobTypeKey ? rowsMatchingJobType(selectedJobTypeKey) : null;
    return { catRows, jtRows };
  };
  const debug = debugCandidates();

 
  const Counter = ({ current, max }: { current: number; max: number }) => (
    <span className={`ml-2 text-xs font-normal tabular-nums ${current > max ? "text-red-500 font-semibold" : current > max * 0.85 ? "text-yellow-500" : "text-gray-400"}`}>
      {current}/{max}
    </span>
  );

  return (
    <section className="flex justify-center py-8">
      <form className="w-full max-w-[900px] px-4" onSubmit={handleSubmit}>
        {errorMessage && <div className="mb-4 text-sm text-red-600">{errorMessage}</div>}
        {infoMessage && <div className="mb-4 text-sm text-gray-600">{infoMessage}</div>}
        {successMessage && <div className="mb-4 text-sm text-green-600">{successMessage}</div>}

        {/* Job Title */}
        <div className="mb-4">
          <label className={labelClass}>
            Job Title <Counter current={title.length} max={50} />
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Unity Developer"
            className={`${inputClass} ${title.length > 50 ? "border-red-400" : ""}`}
          />
        </div>

        {/* Job Description */}
        <div className="mb-4">
          <label className={labelClass}>
            Job Description <Counter current={description.length} max={200} />
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Short description (optional)"
            className={`${textareaClass} ${description.length > 200 ? "border-red-400" : ""}`}
          />
          {description.length > 200 && (
            <p className="text-xs text-red-500 mt-1">Description melebihi batas 200 karakter</p>
          )}
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className={labelClass}>Category (pick one)</label>
          <div className="flex gap-3">
            {categoriesList.map(c => (
              <button key={c.id} type="button"
                onClick={() => { setSelectedCategoryKey(isCatSelected(c.id) ? null : c.id); setErrorMessage(null); setInfoMessage(null); }}
                className={`px-3 py-2 rounded-lg border ${isCatSelected(c.id) ? "bg-[#214B62] text-white border-[#214B62]" : "bg-white text-black border-gray-200"}`}>
                {c.label}
              </button>
            ))}
          </div>
          <div className="text-xs text-gray-500 mt-2">Frontend maps variations (e.g. backend "Admins" will match "Admin").</div>
        </div>

        {/* Job Type */}
        <div className="mb-4">
          <label className={labelClass}>Job Type (pick one)</label>
          <div className="flex gap-3">
            {jobTypesList.map(j => (
              <button key={j.id} type="button"
                onClick={() => { setSelectedJobTypeKey(isJobTypeSelected(j.id) ? null : j.id); setErrorMessage(null); setInfoMessage(null); }}
                className={`px-3 py-2 rounded-lg border ${isJobTypeSelected(j.id) ? "bg-[#214B62] text-white border-[#214B62]" : "bg-white text-black border-gray-200"}`}>
                {j.label}
              </button>
            ))}
          </div>
        </div>

        {/* debug candidates */}
        <div className="mb-3 text-sm text-gray-600">
          {debug?.catRows && <div>Category matches: {debug.catRows.map(r => `${r.name_category} (${r.job_type}) [id=${r.id_category}]`).join("; ")}</div>}
          {debug?.jtRows && <div>JobType matches: {debug.jtRows.map(r => `${r.name_category} (${r.job_type}) [id=${r.id_category}]`).join("; ")}</div>}
        </div>

        {/* Responsibilities */}
        <div className="mb-4">
          <label className={labelClass}>
            Responsibilities
            <Counter current={respTotal} max={800} />
            {respTotal > 800 && <span className="ml-1 text-xs text-red-500">— terlalu panjang</span>}
          </label>
          <div className="space-y-2">
            {responsibilities.map((r, i) => (
              <div key={i} className="flex gap-2">
                <input
                  value={r}
                  onChange={(e) => setResponsibilityAt(i, e.target.value)}
                  placeholder={`Responsibility ${i + 1}`}
                  className="flex-1 rounded-md border px-3 py-2"
                />
                <button type="button" onClick={() => removeResponsibility(i)}
                  className="px-3 py-1 text-sm text-red-600 border rounded">&times;</button>
              </div>
            ))}
            <button type="button" onClick={addResponsibility} className="text-sm text-blue-600">
              + Add responsibility
            </button>
          </div>
        </div>

        {/* Requirements */}
        <div className="mb-4">
          <label className={labelClass}>
            Job Requirements
            <Counter current={reqTotal} max={200} />
            {reqTotal > 200 && <span className="ml-1 text-xs text-red-500">— terlalu panjang</span>}
          </label>
          {reqTotal > 160 && reqTotal <= 200 && (
            <p className="text-xs text-yellow-600 mb-1">⚠ Mendekati batas 200 karakter — buat requirement lebih singkat</p>
          )}
          {reqTotal > 200 && (
            <p className="text-xs text-red-500 mb-1">Requirements melebihi batas 200 karakter — kurangi atau persingkat</p>
          )}
          <div className="space-y-2">
            {requirements.map((r, i) => (
              <div key={i} className="flex gap-2">
                <input
                  value={r}
                  onChange={(e) => setRequirementAt(i, e.target.value)}
                  placeholder={`Requirement ${i + 1}`}
                  className="flex-1 rounded-md border px-3 py-2"
                />
                <button type="button" onClick={() => removeRequirement(i)}
                  className="px-3 py-1 text-sm text-red-600 border rounded">&times;</button>
              </div>
            ))}
            <button type="button" onClick={addRequirement} className="text-sm text-blue-600">
              + Add requirement
            </button>
          </div>
        </div>

        <div className="pt-3 flex gap-3">
          <button type="submit" disabled={creating}
            className="w-full rounded-lg bg-[#214B62] text-white py-3 disabled:opacity-60">
            {creating ? "Creating..." : "Create Job"}
          </button>
          <button type="button" onClick={() => {
            setTitle(""); setDescription(""); setResponsibilities([""]); setRequirements([""]);
            setSelectedCategoryKey(null); setSelectedJobTypeKey(null);
            setErrorMessage(null); setInfoMessage(null); setSuccessMessage(null);
          }} className="rounded-lg border px-4 py-3">Reset</button>
        </div>
      </form>
    </section>
  );
}
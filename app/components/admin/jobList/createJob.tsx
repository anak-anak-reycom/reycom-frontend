// components/CreateJobForm.tsx
'use client';

import React, { useEffect, useState } from "react";
import axios from "axios";
import type { CategoryItem } from "@/app/types/category-types";

type Props = { onCreated?: () => void };

export default function CreateJobForm({ onCreated }: Props) {
  const BASE_API = process.env.NEXT_PUBLIC_BASE_API ?? "";

  // form
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [responsibilities, setResponsibilities] = useState<string[]>([""]);
  const [requirements, setRequirements] = useState<string[]>([""]);

  // backend data
  const [rawCategories, setRawCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(false);

  // frontend choices (fixed)
  const categoriesList = [
    { id: "admin", label: "Admin" },
    { id: "it", label: "IT" },
    { id: "marketing", label: "Marketing" },
  ];
  const jobTypesList = [
    { id: "full_time", label: "Full Time" },
    { id: "part_time", label: "Part Time" },
  ];

  // selections (single each)
  const [selectedCategoryKey, setSelectedCategoryKey] = useState<string | null>(null);
  const [selectedJobTypeKey, setSelectedJobTypeKey] = useState<string | null>(null);

  // UI
  const [creating, setCreating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // styles
  const inputClass = "w-full rounded-full border-2 border-gray-300 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#214B62]";
  const textareaClass = "w-full rounded-xl border-2 border-gray-300 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#214B62] min-h-[120px]";
  const labelClass = "block mb-2 font-medium";

  function normalizeJobType(s: string | null | undefined) {
    if (!s) return "";
    const low = String(s).toLowerCase();
    if (low.includes("full")) return "full time";
    if (low.includes("part")) return "part time";
    return low;
  }

  // fetch backend categories (normalize)
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
        console.error("Failed to load categories", err);
        setErrorMessage(err?.response?.data?.message ?? err?.message ?? "Failed to load categories");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [BASE_API]);

  // helpers to find candidate backend rows
  const rowsMatchingFrontendCategory = (frontendKey: string) => {
    const label = (categoriesList.find(c => c.id === frontendKey)?.label ?? "").toLowerCase();
    return rawCategories.filter(r => {
      const backend = (r.name_category ?? "").toLowerCase();
      if (!backend) return false;
      if (backend === label) return true;
      if (backend.includes(label)) return true;
      if (label.includes(backend)) return true;
      const tokens = backend.split(/[^a-z0-9]+/).filter(Boolean);
      if (tokens.some(t => t === label)) return true;
      return false;
    });
  };

  const rowsMatchingJobType = (jobTypeKey: string) => {
    const label = (jobTypesList.find(j => j.id === jobTypeKey)?.label ?? "").toLowerCase();
    const norm = normalizeJobType(label);
    return rawCategories.filter(r => normalizeJobType(r.job_type) === norm);
  };

  // explicit resolver with logging
  const resolveCategoryIdWithDebug = (): { id: number | null; debugText: string; candidates?: CategoryItem[] } => {
    const debug: string[] = [];
    if (!selectedCategoryKey && !selectedJobTypeKey) {
      return { id: null, debugText: "No selection (need category + job type)" };
    }

    const catRows = selectedCategoryKey ? rowsMatchingFrontendCategory(selectedCategoryKey) : null;
    const jtRows = selectedJobTypeKey ? rowsMatchingJobType(selectedJobTypeKey) : null;

    debug.push(`Category selection rows: ${catRows ? catRows.map(r => `${r.name_category} (${r.job_type}) [id=${r.id_category}]`).join("; ") : "none"}`);
    debug.push(`JobType selection rows: ${jtRows ? jtRows.map(r => `${r.name_category} (${r.job_type}) [id=${r.id_category}]`).join("; ") : "none"}`);

    // if both chosen => filter catRows by jobType OR jtRows by category (same result)
    if (catRows && jtRows) {
      const filtered = catRows.filter(r => normalizeJobType(r.job_type) === normalizeJobType(jobTypesList.find(j => j.id === selectedJobTypeKey)!.label));
      debug.push(`Filtered candidates (catRows ∩ jt type): ${filtered.map(f => `${f.name_category} (${f.job_type}) [id=${f.id_category}]`).join("; ") || "none"}`);

      if (filtered.length === 1) return { id: filtered[0].id_category, debugText: debug.join("\n"), candidates: filtered };
      if (filtered.length > 1) return { id: null, debugText: `Ambiguous after filtering — candidates: ${filtered.map(f => f.id_category).join(", ")}`, candidates: filtered };
      return { id: null, debugText: debug.join("\n") + "\nNo candidate matches both category+jobType" };
    }

    // only category selected
    if (catRows && !jtRows) {
      if (catRows.length === 1) return { id: catRows[0].id_category, debugText: `Single candidate from category: ${catRows[0].id_category}`, candidates: catRows };
      return { id: null, debugText: `Category ambiguous: ${catRows.map(r => r.id_category).join(", ")}`, candidates: catRows };
    }

    // only jobType selected
    if (!catRows && jtRows) {
      if (jtRows.length === 1) return { id: jtRows[0].id_category, debugText: `Single candidate from jobType: ${jtRows[0].id_category}`, candidates: jtRows };
      return { id: null, debugText: `JobType ambiguous: ${jtRows.map(r => r.id_category).join(", ")}`, candidates: jtRows };
    }

    return { id: null, debugText: "Unknown matching state" };
  };

  // handlers for dynamic lists
  const setResponsibilityAt = (idx:number, v:string) => setResponsibilities(prev => prev.map((x,i)=> i===idx? v : x));
  const addResponsibility = () => setResponsibilities(p => [...p, ""]);
  const removeResponsibility = (idx:number) => setResponsibilities(p => p.filter((_,i)=> i!==idx));
  const setRequirementAt = (idx:number, v:string) => setRequirements(prev => prev.map((x,i)=> i===idx? v : x));
  const addRequirement = () => setRequirements(p => [...p, ""]);
  const removeRequirement = (idx:number) => setRequirements(p => p.filter((_,i)=> i!==idx));

  // submit
  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage(null);
    setInfoMessage(null);
    setSuccessMessage(null);

    if (!title.trim()) { setErrorMessage("Job title is required"); return; }

    const resolved = resolveCategoryIdWithDebug();
    // always console.debug the resolve steps so you see candidates + final id
    console.debug("resolveCategory debug:\n", resolved.debugText);
    if (resolved.candidates) console.debug("candidates array:", resolved.candidates);

    if (!resolved.id) {
      setErrorMessage(resolved.debugText || "Cannot resolve categoryId — see console for details");
      return;
    }

    setCreating(true);
    try {
      const responsibilitiesClean = responsibilities.map(r => r.trim()).filter(Boolean).join(",");
      const requirementsClean = requirements.map(r => r.trim()).filter(Boolean).join(",");

      const jobPayload: any = {
        jobName: title.trim(),
        jobDate: new Date().toISOString(),
        jobDescription: description.trim() || null,
        jobResponbilities: responsibilitiesClean || null,
        jobRequirement: requirementsClean || null,
        categoryId: Number(resolved.id),
      };

      // log final id & payload BEFORE sending
      console.debug("Final categoryId ->", resolved.id);
      console.debug("Final jobPayload ->", jobPayload);

      const res = await axios.post(`${BASE_API}/career`, jobPayload, { headers: { "Content-Type": "application/json" }});
      setSuccessMessage("Job created successfully");
      // reset
      setTitle(""); setDescription(""); setResponsibilities([""]); setRequirements([""]);
      setSelectedCategoryKey(null); setSelectedJobTypeKey(null);
      onCreated?.();
    } catch (err: any) {
      console.error("create job failed", err);
      const srv = err?.response?.data;
      let message = "Failed to create job";
      if (srv) {
        if (srv.message) message = String(srv.message);
        else message = JSON.stringify(srv);
      } else if (err?.message) message = err.message;
      setErrorMessage(message);
    } finally {
      setCreating(false);
      setTimeout(()=> setSuccessMessage(null), 2500);
    }
  };

  // UI helpers
  const isCatSelected = (k:string) => selectedCategoryKey === k;
  const isJobTypeSelected = (k:string) => selectedJobTypeKey === k;

  // small debug values to help user
  const debugCandidates = () => {
    if (!rawCategories.length) return null;
    const catRows = selectedCategoryKey ? rowsMatchingFrontendCategory(selectedCategoryKey) : null;
    const jtRows = selectedJobTypeKey ? rowsMatchingJobType(selectedJobTypeKey) : null;
    return { catRows, jtRows };
  };

  const debug = debugCandidates();

  return (
    <section className="flex justify-center py-8">
      <form className="w-full max-w-[900px] px-4" onSubmit={handleSubmit}>
        {errorMessage && <div className="mb-4 text-sm text-red-600">{errorMessage}</div>}
        {infoMessage && <div className="mb-4 text-sm text-gray-600">{infoMessage}</div>}
        {successMessage && <div className="mb-4 text-sm text-green-600">{successMessage}</div>}

        <div className="mb-4">
          <label className={labelClass}>Job Title</label>
          <input value={title} onChange={(e)=> setTitle(e.target.value)} placeholder="Unity Developer" className={inputClass} />
        </div>

        <div className="mb-4">
          <label className={labelClass}>Job Description</label>
          <textarea value={description} onChange={(e)=> setDescription(e.target.value)} rows={3} placeholder="Short description (optional)" className={textareaClass} />
        </div>

        <div className="mb-4">
          <label className={labelClass}>Category (pick one)</label>
          <div className="flex gap-3">
            {categoriesList.map(c => (
              <button key={c.id} type="button" onClick={()=> {
                setSelectedCategoryKey(selectedCategoryKey === c.id ? null : c.id);
                setErrorMessage(null);
                setInfoMessage(null);
              }}
                className={`px-3 py-2 rounded-lg border ${isCatSelected(c.id) ? "bg-[#214B62] text-white border-[#214B62]" : "bg-white text-black border-gray-200"}`}>
                {c.label}
              </button>
            ))}
          </div>
          <div className="text-xs text-gray-500 mt-2">Frontend maps variations (e.g. backend "Admins" will match "Admin").</div>
        </div>

        <div className="mb-4">
          <label className={labelClass}>Job Type (pick one)</label>
          <div className="flex gap-3">
            {jobTypesList.map(j => (
              <button key={j.id} type="button" onClick={()=> {
                setSelectedJobTypeKey(selectedJobTypeKey === j.id ? null : j.id);
                setErrorMessage(null);
                setInfoMessage(null);
              }}
                className={`px-3 py-2 rounded-lg border ${isJobTypeSelected(j.id) ? "bg-[#214B62] text-white border-[#214B62]" : "bg-white text-black border-gray-200"}`}>
                {j.label}
              </button>
            ))}
          </div>
        </div>

        {/* candidate debug */}
        <div className="mb-3 text-sm text-gray-600">
          {debug?.catRows && <div>Category matches: {debug.catRows.map(r => `${r.name_category} (${r.job_type}) [id=${r.id_category}]`).join("; ")}</div>}
          {debug?.jtRows && <div>JobType matches: {debug.jtRows.map(r => `${r.name_category} (${r.job_type}) [id=${r.id_category}]`).join("; ")}</div>}
        </div>

        {/* responsibilities */}
        <div className="mb-4">
          <label className={labelClass}>Responsibilities</label>
          <div className="space-y-2">
            {responsibilities.map((r,i)=> (
              <div key={i} className="flex gap-2">
                <input value={r} onChange={(e)=> setResponsibilityAt(i, e.target.value)} placeholder={`Responsibility ${i+1}`} className="flex-1 rounded-md border px-3 py-2" />
                <button type="button" onClick={()=> removeResponsibility(i)} className="px-3 py-1 text-sm text-red-600 border rounded">&times;</button>
              </div>
            ))}
            <div><button type="button" onClick={addResponsibility} className="text-sm text-blue-600">+ Add responsibility</button></div>
          </div>
        </div>

        {/* requirements */}
        <div className="mb-4">
          <label className={labelClass}>Job Requirements</label>
          <div className="space-y-2">
            {requirements.map((r,i)=> (
              <div key={i} className="flex gap-2">
                <input value={r} onChange={(e)=> setRequirementAt(i, e.target.value)} placeholder={`Requirement ${i+1}`} className="flex-1 rounded-md border px-3 py-2" />
                <button type="button" onClick={()=> removeRequirement(i)} className="px-3 py-1 text-sm text-red-600 border rounded">&times;</button>
              </div>
            ))}
            <div><button type="button" onClick={addRequirement} className="text-sm text-blue-600">+ Add requirement</button></div>
          </div>
        </div>

        <div className="pt-3 flex gap-3">
          <button type="submit" disabled={creating} className="w-full rounded-lg bg-[#214B62] text-white py-3">{creating ? "Creating..." : "Create Job"}</button>
          <button type="button" onClick={() => {
            setTitle(""); setDescription(""); setResponsibilities([""]); setRequirements([""]);
            setSelectedCategoryKey(null); setSelectedJobTypeKey(null); setErrorMessage(null); setInfoMessage(null); setSuccessMessage(null);
          }} className="rounded-lg border px-4 py-3">Reset</button>
        </div>
      </form>
    </section>
  );
}
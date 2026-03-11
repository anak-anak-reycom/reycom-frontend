    // components/admin/jobList/editJobForm.tsx
    'use client';

    import React, { useEffect, useState } from "react";
    import axios from "axios";
    import type { CategoryItem } from "@/app/types/category-types";


    type Props = { jobId: number; onUpdated?: () => void };

    export default function EditJobForm({ jobId, onUpdated }: Props) {
    const BASE_API = process.env.NEXT_PUBLIC_BASE_API ?? "";

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [responsibilities, setResponsibilities] = useState<string[]>([""]);
    const [requirements, setRequirements] = useState<string[]>([""]);
    const [existingJobDate, setExistingJobDate] = useState<string | null>(null);

    const [rawCategories, setRawCategories] = useState<CategoryItem[]>([]);
    const [loadingForm, setLoadingForm] = useState(true);

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

    const [updating, setUpdating] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

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

    
    function applyExistingCategory(categoryId: number, categories: CategoryItem[]) {
        const match = categories.find(r => r.id_category === categoryId);
        if (!match) return;

        const backendName = (match.name_category ?? "").toLowerCase();
        const backendJobType = normalizeJobType(match.job_type);

        
        const catMatch = categoriesList.find(c => {
        const label = c.label.toLowerCase();
        return backendName === label || backendName.includes(label) || label.includes(backendName);
        });
        if (catMatch) setSelectedCategoryKey(catMatch.id);

    
        const jtMatch = jobTypesList.find(j => normalizeJobType(j.label) === backendJobType);
        if (jtMatch) setSelectedJobTypeKey(jtMatch.id);
    }

    
    useEffect(() => {
        let mounted = true;
        (async () => {
        setLoadingForm(true);
        try {
            const [catRes, jobRes] = await Promise.all([
            axios.get(`${BASE_API}/category`),
            axios.get(`${BASE_API}/career/${jobId}`),
            ]);

            if (!mounted) return;

            
            const payload = catRes.data?.data ?? catRes.data;
            const arr = Array.isArray(payload) ? payload : [];
            const normalized: CategoryItem[] = arr.map((r: any) => ({
            id_category: Number(r?.idCategory ?? r?.id_category ?? r?.id ?? 0),
            name_category: String(r?.nameCategory ?? r?.name_category ?? r?.name ?? ""),
            job_type: String(r?.jobType ?? r?.job_type ?? ""),
            created_at: r?.createdAt ?? r?.created_at ?? new Date(),
            updated_at: r?.updatedAt ?? r?.updated_at ?? new Date(),
            }));
            setRawCategories(normalized);

            
            const job = jobRes.data?.data ?? jobRes.data;
            setTitle(job?.jobName ?? "");
            setDescription(job?.jobDescription ?? "");
            setExistingJobDate(job?.jobDate ?? null);

            const respRaw = job?.jobResponbilities ?? "";
            setResponsibilities(
            respRaw ? respRaw.split(",").map((s: string) => s.trim()).filter(Boolean) : [""]
            );

            const reqRaw = job?.jobRequirement ?? "";
            setRequirements(
            reqRaw ? reqRaw.split(",").map((s: string) => s.trim()).filter(Boolean) : [""]
            );

            
            if (job?.categoryId) applyExistingCategory(Number(job.categoryId), normalized);

        } catch (err: any) {
            if (mounted) setErrorMessage(err?.response?.data?.message ?? err?.message ?? "Failed to load job data");
        } finally {
            if (mounted) setLoadingForm(false);
        }
        })();
        return () => { mounted = false; };
    }, [jobId, BASE_API]);

    
    const rowsMatchingFrontendCategory = (frontendKey: string) => {
        const label = (categoriesList.find(c => c.id === frontendKey)?.label ?? "").toLowerCase();
        return rawCategories.filter(r => {
        const backend = (r.name_category ?? "").toLowerCase();
        if (!backend) return false;
        if (backend === label || backend.includes(label) || label.includes(backend)) return true;
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
    // ====================================================

    const setResponsibilityAt = (idx: number, v: string) => setResponsibilities(prev => prev.map((x, i) => i === idx ? v : x));
    const addResponsibility = () => setResponsibilities(p => [...p, ""]);
    const removeResponsibility = (idx: number) => setResponsibilities(p => p.filter((_, i) => i !== idx));
    const setRequirementAt = (idx: number, v: string) => setRequirements(prev => prev.map((x, i) => i === idx ? v : x));
    const addRequirement = () => setRequirements(p => [...p, ""]);
    const removeRequirement = (idx: number) => setRequirements(p => p.filter((_, i) => i !== idx));

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setErrorMessage(null);
        setSuccessMessage(null);

        if (!title.trim()) { setErrorMessage("Job title is required"); return; }

        const resolved = resolveCategoryIdWithDebug();
        console.debug("resolveCategory debug:", resolved.debugText);
        if (resolved.candidates) console.debug("candidates:", resolved.candidates);

        if (!resolved.id) { setErrorMessage(resolved.debugText || "Cannot resolve categoryId"); return; }

        setUpdating(true);
        try {
        const jobPayload: any = {
            jobName: title.trim(),
            jobDate: existingJobDate ?? new Date().toISOString(), // pakai tanggal lama
            jobDescription: description.trim() || null,
            jobResponbilities: responsibilities.map(r => r.trim()).filter(Boolean).join(",") || null,
            jobRequirement: requirements.map(r => r.trim()).filter(Boolean).join(",") || null,
            categoryId: Number(resolved.id),
        };

        console.debug("PATCH payload:", jobPayload);

        await axios.patch(`${BASE_API}/career/${jobId}`, jobPayload, {
            headers: { "Content-Type": "application/json" },
        });

        setSuccessMessage("Job updated successfully");
        onUpdated?.();
        } catch (err: any) {
        const srv = err?.response?.data;
        setErrorMessage(srv?.message ?? JSON.stringify(srv) ?? err?.message ?? "Failed to update job");
        } finally {
        setUpdating(false);
        setTimeout(() => setSuccessMessage(null), 2500);
        }
    };

    const isCatSelected = (k: string) => selectedCategoryKey === k;
    const isJobTypeSelected = (k: string) => selectedJobTypeKey === k;

    if (loadingForm) return <p className="text-center py-10">Loading job data...</p>;

    return (
        <section className="flex justify-center py-8">
        <form className="w-full max-w-[900px] px-4" onSubmit={handleSubmit}>
            {errorMessage && <div className="mb-4 text-sm text-red-600">{errorMessage}</div>}
            {successMessage && <div className="mb-4 text-sm text-green-600">{successMessage}</div>}

            <div className="mb-4">
            <label className={labelClass}>Job Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Unity Developer" className={inputClass} />
            </div>

            <div className="mb-4">
            <label className={labelClass}>Job Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className={textareaClass} />
            </div>

            <div className="mb-4">
            <label className={labelClass}>Category (pick one)</label>
            <div className="flex gap-3">
                {categoriesList.map(c => (
                <button key={c.id} type="button"
                    onClick={() => { setSelectedCategoryKey(isCatSelected(c.id) ? null : c.id); setErrorMessage(null); }}
                    className={`px-3 py-2 rounded-lg border ${isCatSelected(c.id) ? "bg-[#214B62] text-white border-[#214B62]" : "bg-white text-black border-gray-200"}`}>
                    {c.label}
                </button>
                ))}
            </div>
            </div>

            <div className="mb-4">
            <label className={labelClass}>Job Type (pick one)</label>
            <div className="flex gap-3">
                {jobTypesList.map(j => (
                <button key={j.id} type="button"
                    onClick={() => { setSelectedJobTypeKey(isJobTypeSelected(j.id) ? null : j.id); setErrorMessage(null); }}
                    className={`px-3 py-2 rounded-lg border ${isJobTypeSelected(j.id) ? "bg-[#214B62] text-white border-[#214B62]" : "bg-white text-black border-gray-200"}`}>
                    {j.label}
                </button>
                ))}
            </div>
            </div>

            <div className="mb-4">
            <label className={labelClass}>Responsibilities</label>
            <div className="space-y-2">
                {responsibilities.map((r, i) => (
                <div key={i} className="flex gap-2">
                    <input value={r} onChange={(e) => setResponsibilityAt(i, e.target.value)} placeholder={`Responsibility ${i + 1}`} className="flex-1 rounded-md border px-3 py-2" />
                    <button type="button" onClick={() => removeResponsibility(i)} className="px-3 py-1 text-sm text-red-600 border rounded">&times;</button>
                </div>
                ))}
                <button type="button" onClick={addResponsibility} className="text-sm text-blue-600">+ Add responsibility</button>
            </div>
            </div>

            <div className="mb-4">
            <label className={labelClass}>Job Requirements</label>
            <div className="space-y-2">
                {requirements.map((r, i) => (
                <div key={i} className="flex gap-2">
                    <input value={r} onChange={(e) => setRequirementAt(i, e.target.value)} placeholder={`Requirement ${i + 1}`} className="flex-1 rounded-md border px-3 py-2" />
                    <button type="button" onClick={() => removeRequirement(i)} className="px-3 py-1 text-sm text-red-600 border rounded">&times;</button>
                </div>
                ))}
                <button type="button" onClick={addRequirement} className="text-sm text-blue-600">+ Add requirement</button>
            </div>
            </div>

            <div className="pt-3 flex gap-3">
            <button type="submit" disabled={updating} className="w-full rounded-lg bg-[#214B62] text-white py-3">
                {updating ? "Updating..." : "Update Job"}
            </button>
            </div>
        </form>
        </section>
    );
    }
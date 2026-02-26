// "use client";
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {CategoryItem} from "@/app/types/category-types";
import {getCategoryName, getJobTypes} from "@/app/data/category";
import { BASE_API, parseApiResponse } from "../../../data/api" 


type Props = {
    onCreated?: () => void; // callback optional setelah sukses
};

export default function CreateJobForm({ onCreated }: Props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [categories, setCategories] = useState<CategoryItem[]>([]);
    const [categoryId, setCategoryId] = useState<number | "new" | "">("");
    const [newCategoryName, setNewCategoryName] = useState("");
    const [newCategoryJobType, setNewCategoryJobType] = useState("Full Time");

    const [responsibilities, setResponsibilities] = useState<string[]>([""]);
    const [requirements, setRequirements] = useState<string[]>([""]);

    const [loadingCategories, setLoadingCategories] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // load categories on mount
    useEffect(() => {
        let mounted = true;
        async function load() {
            setLoadingCategories(true);
            try {
                const res = await axios.get(`${BASE_API}/category`);
                if (mounted) {
                    // support responses like { data: [ ... ] } or { data: { data: [...] } }
                    const data = res.data?.data ?? res.data;
                    setCategories(data ?? []);
                }
            } catch (err) {
                console.error("Failed to load categories", err);
            } finally {
                setLoadingCategories(false);
            }
        }
        load();
        return () => { mounted = false; };
    }, []);

    // --- responsibilities helpers ---
    const setResponsibilityAt = (idx: number, value: string) => {
        setResponsibilities((prev) => prev.map((v, i) => (i === idx ? value : v)));
    };
    const addResponsibility = () => setResponsibilities((p) => [...p, ""]);
    const removeResponsibility = (idx: number) =>
        setResponsibilities((p) => p.filter((_, i) => i !== idx));

    // --- requirements helpers ---
    const setRequirementAt = (idx: number, value: string) => {
        setRequirements((prev) => prev.map((v, i) => (i === idx ? value : v)));
    };
    const addRequirement = () => setRequirements((p) => [...p, ""]);
    const removeRequirement = (idx: number) => setRequirements((p) => p.filter((_, i) => i !== idx));

    // add new category inline
    const handleCreateCategory = async () => {
        if (!newCategoryName.trim()) {
            setErrorMessage("Category name required");
            return;
        }
        try {
            setErrorMessage(null);
            const payload = {
                name_category: newCategoryName,
                job_type: newCategoryJobType,
            };
            const res = await axios.post(`${BASE_API}/category`, payload);
            // response handling - adapt if API returns nested object
            const created = res.data?.data ?? res.data;
            // reload categories or append created
            setCategories((prev) => (created ? [created, ...prev] : prev));
            setCategoryId(created?.id_category ?? "");
            setNewCategoryName("");
            setSuccessMessage("Category created");
            setTimeout(() => setSuccessMessage(null), 2000);
        } catch (err: any) {
            console.error(err);
            setErrorMessage(err?.response?.data?.message ?? "Failed to create category");
        }
    };

    // submit job
    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setErrorMessage(null);
        setSuccessMessage(null);

        // simple client validation
        if (!title.trim()) { setErrorMessage("Job title is required"); return; }
        if (!categoryId) { setErrorMessage("Please choose or create a category"); return; }

        // convert arrays -> comma-separated string
        // remove empty entries, trim each
        const responsibilitiesClean = responsibilities
            .map((r) => r.trim())
            .filter(Boolean)
            .join(","); // <-- join using comma as requested

        const requirementsClean = requirements
            .map((r) => r.trim())
            .filter(Boolean)
            .join(","); // <-- join using comma

        const payload = {
            jobName: title,
            jobDate: new Date().toISOString(),
            jobDescription: description || null,
            jobResponbilities: responsibilitiesClean || null,
            jobRequirement: requirementsClean || null,
            categoryId: typeof categoryId === "number" ? categoryId : undefined, // if backend supports
        };

        try {
            setSubmitting(true);
            const res = await axios.post(`${BASE_API}/career`, payload, {
                headers: { "Content-Type": "application/json" },
            });
            const created = res.data?.data ?? res.data;
            setSuccessMessage("Job created successfully");
            setTitle("");
            setDescription("");
            setResponsibilities([""]);
            setRequirements([""]);
            setCategoryId("");
            onCreated?.();
        } catch (err: any) {
            console.error("Create job failed", err);
            setErrorMessage(err?.response?.data?.message ?? "Failed to create job");
        } finally {
            setSubmitting(false);
            setTimeout(() => setSuccessMessage(null), 2500);
        }
    };

    return (
        <div className="max-w-[900px] mx-auto p-6 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Create Job</h2>

            {errorMessage && <div className="mb-3 text-sm text-red-600">{errorMessage}</div>}
            {successMessage && <div className="mb-3 text-sm text-green-600">{successMessage}</div>}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                    <label className="block text-sm font-medium mb-2">Job Title</label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Backend Developer"
                        className="w-full rounded-md border px-4 py-2"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium mb-2">Job Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        placeholder="Short description for card view (optional)"
                        className="w-full rounded-md border px-4 py-2"
                    />
                </div>

                {/* Category selector & add */}
                <div>
                    <label className="block text-sm font-medium mb-2">Category</label>

                    <div className="flex items-center gap-3">
                        <select
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value === "new" ? "new" : e.target.value === "" ? "" : Number(e.target.value))}
                            className="rounded-md border px-3 py-2 flex-1"
                        >
                            <option value="">-- choose category --</option>
                            {loadingCategories ? (
                                <option disabled>Loading...</option>
                            ) : (
                                categories.map((c) => (
                                    <option key={c.id_category} value={c.id_category}>
                                        {c.name_category} — {c.job_type}
                                    </option>
                                ))
                            )}
                            <option value="new">+ Add new category</option>
                        </select>
                    </div>

                    {/* show add category inputs when "new" selected */}
                    {categoryId === "new" && (
                        <div className="mt-3 space-y-2">
                            <input
                                value={newCategoryName}
                                onChange={(e) => setNewCategoryName(e.target.value)}
                                placeholder="Category name (eg. HR, IT)"
                                className="w-full rounded-md border px-3 py-2"
                            />
                            <select
                                value={newCategoryJobType}
                                onChange={(e) => setNewCategoryJobType(e.target.value)}
                                className="rounded-md border px-3 py-2"
                            >
                                <option>Full Time</option>
                                <option>Part Time</option>
                                <option>Contract</option>
                            </select>
                            <div>
                                <button
                                    type="button"
                                    onClick={handleCreateCategory}
                                    className="rounded bg-blue-600 text-white px-4 py-2"
                                >
                                    Create category
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setCategoryId("");
                                        setNewCategoryName("");
                                    }}
                                    className="ml-3 text-sm text-gray-600"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Responsibilities dynamic */}
                <div>
                    <label className="block text-sm font-medium mb-2">Responsibilities (one per field)</label>
                    <div className="space-y-2">
                        {responsibilities.map((r, i) => (
                            <div key={i} className="flex gap-2">
                                <input
                                    value={r}
                                    onChange={(e) => setResponsibilityAt(i, e.target.value)}
                                    placeholder={`Responsibility ${i + 1}`}
                                    className="flex-1 rounded-md border px-3 py-2"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeResponsibility(i)}
                                    className="px-3 py-1 text-sm text-red-600 border rounded"
                                    aria-label={`Remove responsibility ${i + 1}`}
                                >
                                    &times;
                                </button>
                            </div>
                        ))}

                        <div>
                            <button type="button" onClick={addResponsibility} className="text-sm text-blue-600">
                                + Add responsibility
                            </button>
                        </div>
                    </div>
                </div>

                {/* Requirements dynamic */}
                <div>
                    <label className="block text-sm font-medium mb-2">Job Requirements (one per field)</label>
                    <div className="space-y-2">
                        {requirements.map((r, i) => (
                            <div key={i} className="flex gap-2">
                                <input
                                    value={r}
                                    onChange={(e) => setRequirementAt(i, e.target.value)}
                                    placeholder={`Requirement ${i + 1}`}
                                    className="flex-1 rounded-md border px-3 py-2"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeRequirement(i)}
                                    className="px-3 py-1 text-sm text-red-600 border rounded"
                                >
                                    &times;
                                </button>
                            </div>
                        ))}

                        <div>
                            <button type="button" onClick={addRequirement} className="text-sm text-blue-600">
                                + Add requirement
                            </button>
                        </div>
                    </div>
                </div>

                {/* Submit */}
                <div className="pt-3">
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        disabled={submitting}
                        className="rounded bg-blue-700 text-white px-6 py-2"
                    >
                        {submitting ? "Creating..." : "Create Job"}
                    </button>
                </div>
            </form>
        </div>
    );
}
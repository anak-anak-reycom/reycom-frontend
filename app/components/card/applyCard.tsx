// app/components/card/applyCard.tsx
"use client";

import React, { useState } from "react";
import { createSApplier } from "@/app/data/apply"; 

type ApplyFormProps = {
  jobId?: number;
  onSubmitted?: () => void;
};

export default function ApplyForm({ jobId, onSubmitted }: ApplyFormProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    domicile: "",
    resumeText: "", 
  });

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [sending, setSending] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
    setErrorMsg(null);
    setSuccessMsg(null);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setErrorMsg(null);
    setSuccessMsg(null);
    setErrors(prev => ({ ...prev, resumeFile: "" }));
    const f = e.target.files && e.target.files[0] ? e.target.files[0] : null;
    setResumeFile(f);
  }

  function validate() {
    const err: { [k: string]: string } = {};
    if (!form.name.trim()) err.name = "Name is required";
    if (!form.email.trim()) err.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = "Invalid email";
    if (!form.phone.trim()) err.phone = "Phone number is required";
    if (!form.gender.trim()) err.gender = "Choose a gender";
    if (!form.domicile.trim()) err.domicile = "Domicile is required";
 
    if (!resumeFile && !form.resumeText.trim()) err.resume = "Resume file or notes required";
    return err;
  }

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const v = validate();
    if (Object.keys(v).length > 0) {
      setErrors(v);
      return;
    }

    setSending(true);

    try {
     
      if (resumeFile) {
        const fd = new FormData();
        fd.append("nameApply", form.name);
        fd.append("emailApply", form.email);
        fd.append("phoneNumberApply", form.phone);
        fd.append("gender", form.gender);
        fd.append("domicile", form.domicile);
        fd.append("resume", resumeFile); // backend should accept field 'resume' as file
        if (form.resumeText.trim()) fd.append("resumeText", form.resumeText.trim());
        if (jobId !== undefined) fd.append("jobId", String(jobId));

      
        const BASE = process.env.NEXT_PUBLIC_BASE_API ?? "";
        const res = await fetch(`${BASE}/apply`, {
          method: "POST",
          body: fd,
        });
        if (!res.ok) {
          const body = await res.json().catch(() => null);
          throw new Error(body?.message ?? `Server responded ${res.status}`);
        }
      } else {
       
        const payload = {
          nameApply: form.name,
          emailApply: form.email,
          phoneNumberApply: form.phone,
          gender: form.gender,
          domicile: form.domicile,
          resume: form.resumeText.trim(),
          ...(jobId !== undefined ? { jobId } : {}),
        };
        
        await createSApplier(payload as any);
      }

      setSuccessMsg("Application submitted successfully.");
      setForm({
        name: "",
        email: "",
        phone: "",
        gender: "",
        domicile: "",
        resumeText: ""
      });
      setResumeFile(null);
      setErrors({});
      onSubmitted?.();
    } catch (err: any) {
      
      const msg = err?.response?.data?.message ?? err?.message ?? "Failed to submit application.";
      setErrorMsg(String(msg));
    } finally {
      setSending(false);
    }
  }

  const inputClass = "w-full rounded-full border-2 border-gray-300 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#214B62]";
  const labelClass = "block mb-2 font-medium";

  return (
    <section className="flex justify-center py-10">
      <form className="w-full max-w-[620px] px-4" onSubmit={handleSubmit} noValidate>
        {errorMsg && <div className="mb-4 text-sm text-red-600">{errorMsg}</div>}
        {successMsg && <div className="mb-4 text-sm text-green-600">{successMsg}</div>}

        <div className="mb-6">
          <label htmlFor="name" className={labelClass}>Name</label>
          <input id="name" name="name" value={form.name} onChange={handleChange} placeholder="Type Ur Name Here" className={inputClass} aria-invalid={!!errors.name} aria-describedby={errors.name ? "err-name" : undefined} />
          {errors.name && <p id="err-name" className="text-sm text-red-600 mt-2">{errors.name}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="email" className={labelClass}>Email</label>
          <input id="email" type="email" name="email" value={form.email} onChange={handleChange} placeholder="Type Ur Email Here" className={inputClass} aria-invalid={!!errors.email} aria-describedby={errors.email ? "err-email" : undefined} />
          {errors.email && <p id="err-email" className="text-sm text-red-600 mt-2">{errors.email}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="phone" className={labelClass}>Phone Number</label>
          <input id="phone" name="phone" value={form.phone} onChange={handleChange} placeholder="Type Ur Phone Number Here" className={inputClass} type="tel" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "err-phone" : undefined} />
          {errors.phone && <p id="err-phone" className="text-sm text-red-600 mt-2">{errors.phone}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="gender" className={labelClass}>Gender</label>
          <select id="gender" name="gender" value={form.gender} onChange={handleChange} className={"appearance-none " + inputClass + " bg-white pr-8"} aria-invalid={!!errors.gender} aria-describedby={errors.gender ? "err-gender" : undefined}>
            <option value="">Choose Ur Gender Here</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && <p id="err-gender" className="text-sm text-red-600 mt-2">{errors.gender}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="domicile" className={labelClass}>Domicile</label>
          <input id="domicile" name="domicile" value={form.domicile} onChange={handleChange} placeholder="Type Ur Domicile Here" className={inputClass} aria-invalid={!!errors.domicile} aria-describedby={errors.domicile ? "err-domicile" : undefined} />
          {errors.domicile && <p id="err-domicile" className="text-sm text-red-600 mt-2">{errors.domicile}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="resumeText" className={labelClass}>Resume / Notes (optional if you upload a file)</label>
          <textarea id="resumeText" name="resumeText" value={form.resumeText} onChange={handleChange} placeholder="Short notes or paste resume text here" className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#214B62] min-h-[100px]" />
        </div>

        <div className="mb-6">
          <label htmlFor="resumeFile" className={labelClass}>Resume File (optional)</label>
          <input id="resumeFile" name="resumeFile" type="file" onChange={handleFileChange} className="w-full" />
          {resumeFile && <p className="text-sm text-gray-600 mt-2">Selected file: {resumeFile.name}</p>}
          {errors.resume && <p id="err-resume" className="text-sm text-red-600 mt-2">{errors.resume}</p>}
        </div>

        <div>
          <button type="submit" className="w-full rounded-lg bg-[#214B62] text-white text-lg font-medium py-3 disabled:opacity-60" disabled={sending}>
            {sending ? "Sending..." : "Send"}
          </button>
        </div>
      </form>
    </section>
  );
}
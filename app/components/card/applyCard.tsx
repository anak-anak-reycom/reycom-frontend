// app/components/card/applyCard.tsx
"use client";

import React, { useState } from "react";

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
    resume: "",
  });

  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [sending, setSending] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setErrorMsg(null);
    setSuccessMsg(null);
  }

  function validate() {
    const err: { [k: string]: string } = {};
    if (!form.name.trim()) err.name = "Name is required";
    if (!form.email.trim()) err.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = "Invalid email";
    if (!form.phone.trim()) err.phone = "Phone number is required";
    if (!form.gender.trim()) err.gender = "Choose a gender";
    if (!form.domicile.trim()) err.domicile = "Domicile is required";
    if (!form.resume.trim()) err.resume = "Resume link is required";
    else if (form.resume.trim().length < 5) err.resume = "Resume must be at least 5 characters";
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
      const BASE = process.env.NEXT_PUBLIC_BASE_API ?? "";

      const payload = {
        nameApply: form.name.trim(),
        emailApply: form.email.trim(),
        phoneNumberApply: form.phone.trim(),
        gender: form.gender,
        domicile: form.domicile.trim(),
        resume: form.resume.trim(),
        ...(jobId !== undefined ? { jobId } : {}),
      };

      const res = await fetch(`${BASE}/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.message ?? `Server responded ${res.status}`);
      }

      setSuccessMsg("Application submitted successfully.");
      setForm({ name: "", email: "", phone: "", gender: "", domicile: "", resume: "" });
      setErrors({});
      onSubmitted?.();
    } catch (err: any) {
      setErrorMsg(err?.message ?? "Failed to submit application.");
    } finally {
      setSending(false);
    }
  }

  const inputClass =
    "w-full rounded-full border-2 border-gray-300 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#214B62]";
  const labelClass = "block mb-2 font-medium";

  return (
    <section className="flex justify-center py-10">
      <form className="w-full max-w-[620px] px-4" onSubmit={handleSubmit} noValidate>
        {errorMsg && <div className="mb-4 text-sm text-red-600">{errorMsg}</div>}
        {successMsg && <div className="mb-4 text-sm text-green-600">{successMsg}</div>}

        <div className="mb-6">
          <label htmlFor="name" className={labelClass}>Name</label>
          <input
            id="name" name="name" value={form.name}
            onChange={handleChange} placeholder="Type your name here"
            className={inputClass}
          />
          {errors.name && <p className="text-sm text-red-600 mt-2">{errors.name}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="email" className={labelClass}>Email</label>
          <input
            id="email" type="email" name="email" value={form.email}
            onChange={handleChange} placeholder="Type your email here"
            className={inputClass}
          />
          {errors.email && <p className="text-sm text-red-600 mt-2">{errors.email}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="phone" className={labelClass}>Phone Number</label>
          <input
            id="phone" name="phone" type="tel" value={form.phone}
            onChange={handleChange} placeholder="Type your phone number here"
            className={inputClass}
          />
          {errors.phone && <p className="text-sm text-red-600 mt-2">{errors.phone}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="gender" className={labelClass}>Gender</label>
          <select
            id="gender" name="gender" value={form.gender}
            onChange={handleChange}
            className={"appearance-none bg-white pr-8 " + inputClass}
          >
            <option value="">Choose your gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && <p className="text-sm text-red-600 mt-2">{errors.gender}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="domicile" className={labelClass}>Domicile</label>
          <input
            id="domicile" name="domicile" value={form.domicile}
            onChange={handleChange} placeholder="Type your domicile here"
            className={inputClass}
          />
          {errors.domicile && <p className="text-sm text-red-600 mt-2">{errors.domicile}</p>}
        </div>

      
        <div className="mb-6">
          <label htmlFor="resume" className={labelClass}>
            Resume{" "}
            <span className="text-xs font-normal text-gray-400">
              (Google Drive link, etc)
            </span>
          </label>

          <input
            id="resume" name="resume" value={form.resume}
            onChange={handleChange}
            placeholder="https://drive.google.com/file/d/..."
            className={inputClass}
          />
          {errors.resume && <p className="text-sm text-red-600 mt-2">{errors.resume}</p>}
        </div>

        <div>
          <button
            type="submit"
            className="w-full rounded-lg bg-[#214B62] text-white text-lg font-medium py-3 disabled:opacity-60"
            disabled={sending}
          >
            {sending ? "Sending..." : "Send Application"}
          </button>
        </div>
      </form>
    </section>
  );
}
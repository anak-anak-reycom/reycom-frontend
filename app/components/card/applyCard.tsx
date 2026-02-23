// components/ApplyForm.tsx
'use client';

import React, { useState } from "react";

export default function ApplyForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    domicile: "",
    resume: ""
  });

  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [sending, setSending] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  }

  function validate() {
    const err: { [k: string]: string } = {};
    if (!form.name.trim()) err.name = "Name is required";
    if (!form.email.trim()) err.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = "Invalid email";
    if (!form.phone.trim()) err.phone = "Phone number is required";
    if (!form.gender.trim()) err.gender = "Choose a gender";
    if (!form.domicile.trim()) err.domicile = "Domicile is required";
    if (!form.resume.trim()) err.resume = "Resume / notes required";
    return err;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length > 0) {
      setErrors(v);
      return;
    }
    setSending(true);

  }

  const inputClass =
    "w-full rounded-full border-2 border-gray-300 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#214B62]";

  const labelClass = "block mb-2 font-medium";

  return (
    <section className="flex justify-center py-10">
      <form
        className="w-full max-w-[620px] px-4"
        onSubmit={handleSubmit}
        noValidate
      >
        
        <div className="mb-6">
          <label htmlFor="name" className={labelClass}>Name</label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Type Ur Name Here"
            className={inputClass}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "err-name" : undefined}
          />
          {errors.name && <p id="err-name" className="text-sm text-red-600 mt-2">{errors.name}</p>}
        </div>

      
        <div className="mb-6">
          <label htmlFor="email" className={labelClass}>Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Type Ur Email Here"
            className={inputClass}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "err-email" : undefined}
          />
          {errors.email && <p id="err-email" className="text-sm text-red-600 mt-2">{errors.email}</p>}
        </div>

      
        <div className="mb-6">
          <label htmlFor="phone" className={labelClass}>Phone Number</label>
          <input
            id="phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Type Ur Phone Number Here"
            className={inputClass}
            type="tel"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "err-phone" : undefined}
          />
          {errors.phone && <p id="err-phone" className="text-sm text-red-600 mt-2">{errors.phone}</p>}
        </div>

        
        <div className="mb-6">
          <label htmlFor="gender" className={labelClass}>Gender</label>
          <select
            id="gender"
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className={"appearance-none " + inputClass + " bg-white pr-8"}
            aria-invalid={!!errors.gender}
            aria-describedby={errors.gender ? "err-gender" : undefined}
          >
            <option value="">Choose Ur Gender Here</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <p id="err-gender" className="text-sm text-red-600 mt-2">{errors.gender}</p>}
        </div>

        
        <div className="mb-6">
          <label htmlFor="domicile" className={labelClass}>Domicile</label>
          <input
            id="domicile"
            name="domicile"
            value={form.domicile}
            onChange={handleChange}
            placeholder="Type Ur Domicile Here"
            className={inputClass}
            aria-invalid={!!errors.domicile}
            aria-describedby={errors.domicile ? "err-domicile" : undefined}
          />
          {errors.domicile && <p id="err-domicile" className="text-sm text-red-600 mt-2">{errors.domicile}</p>}
        </div>

        
        <div className="mb-6">
          <label htmlFor="resume" className={labelClass}>Resume</label>
          <textarea
            id="resume"
            name="resume"
            value={form.resume}
            onChange={handleChange}
            placeholder="Enter Ur Resume Here"
            className="w-full rounded-xl border-2 border-gray-300 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#214B62] min-h-[72px]"
            aria-invalid={!!errors.resume}
            aria-describedby={errors.resume ? "err-resume" : undefined}
          />
          {errors.resume && <p id="err-resume" className="text-sm text-red-600 mt-2">{errors.resume}</p>}
        </div>

      
        <div>
          <button
            type="submit"
            className="w-full rounded-lg bg-[#214B62] text-white text-lg font-medium py-3 disabled:opacity-60"
            disabled={sending}
          >
            {sending ? "Sending..." : "Send"}
          </button>
        </div>
      </form>
    </section>
  );
}
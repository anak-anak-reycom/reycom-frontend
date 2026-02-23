"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function ApplyForm() {
  // form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [domicile, setDomicile] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // update file and show preview name
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setResumeFile(f);
  };

  const validate = () => {
    const err: Record<string, string> = {};
    if (!name.trim()) err.name = "Name is required";
    if (!email.trim()) err.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email)) err.email = "Invalid email";
    if (!phone.trim()) err.phone = "Phone number is required";
    if (!gender) err.gender = "Choose gender";
    if (!domicile.trim()) err.domicile = "Domicile is required";
    // resume optional — remove block to require
    // if (!resumeFile) err.resume = "Please attach resume";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      // build form data (example) - replace submitUrl with your real endpoint
      const submitUrl = "/api/apply"; // <-- ganti sesuai backendmu
      const fd = new FormData();
      fd.append("name", name);
      fd.append("email", email);
      fd.append("phone", phone);
      fd.append("gender", gender);
      fd.append("domicile", domicile);
      if (resumeFile) fd.append("resume", resumeFile);

      // contoh fetch; ubah jadi axios jika mau
      const res = await fetch(submitUrl, {
        method: "POST",
        body: fd,
      });

      if (!res.ok) throw new Error("Failed to submit");

      // reset form atau tampilkan success
      setName("");
      setEmail("");
      setPhone("");
      setGender("");
      setDomicile("");
      setResumeFile(null);
      setErrors({});
      alert("Application submitted — thanks!");
    } catch (err: any) {
      console.error(err);
      alert(err?.message ?? "Submit failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="flex justify-center py-10">
      <div className="w-full max-w-[500px] px-4">
        <form
          onSubmit={handleSubmit}
          className="border-2 border-blue-300 rounded-lg p-6 bg-white shadow-sm"
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">form</h2>

          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Type Ur Name Here"
              className={`w-full rounded-2xl border border-gray-300 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                errors.name ? "ring-1 ring-red-300" : ""
              }`}
            />
            {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Type Ur Email Here"
              className={`w-full  rounded-2xl border border-gray-300 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                errors.email ? "ring-1 ring-red-300" : ""
              }`}
            />
            {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Phone Number</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Type Ur Phone Number Here"
              className={`w-full rounded-2xl border border-gray-300 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                errors.phone ? "ring-1 ring-red-300" : ""
              }`}
            />
            {errors.phone && <div className="text-red-500 text-xs mt-1">{errors.phone}</div>}
          </div>

          {/* Gender */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Gender</label>
            <div className="relative">
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className={`w-full appearance-none rounded-full border border-gray-300 px-4 py-3 pr-10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                  errors.gender ? "ring-1 ring-red-300" : ""
                }`}
              >
                <option value="">Choose Ur Gender Here</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>

              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
                ▾
              </span>
            </div>
            {errors.gender && <div className="text-red-500 text-xs mt-1">{errors.gender}</div>}
          </div>

          {/* Domicile */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Domicile</label>
            <input
              value={domicile}
              onChange={(e) => setDomicile(e.target.value)}
              placeholder="Type Ur Domicile Here"
              className={`w-full rounded-full border border-gray-300 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                errors.domicile ? "ring-1 ring-red-300" : ""
              }`}
            />
            {errors.domicile && <div className="text-red-500 text-xs mt-1">{errors.domicile}</div>}
          </div>

          {/* Resume */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Resume</label>

            <div className="relative">
              {/* styled fake input */}
              <div className="w-full rounded-full border border-gray-300 px-4 py-3 bg-white flex items-center gap-3">
                {/* small avatar overlay (optional - replace src if you have image) */}
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                  {/* if you have avatar image put <Image src="/avatar.png" .../> */}
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">A</div>
                </div>

                <div className="flex-1 text-sm text-gray-600">
                  {resumeFile ? resumeFile.name : "Enter Ur Resume Here"}
                </div>

                <label
                  htmlFor="resume-upload"
                  className="inline-block bg-transparent px-3 py-1 rounded-full cursor-pointer text-sm text-blue-600"
                >
                  Choose
                </label>
              </div>

              {/* real file input - invisible but clickable via label */}
              <input
                id="resume-upload"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer rounded-full"
              />
            </div>

            {errors.resume && <div className="text-red-500 text-xs mt-1">{errors.resume}</div>}
          </div>

          {/* Submit button */}
          <div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-blue-800 text-white py-3 text-lg font-medium hover:bg-blue-700 disabled:opacity-60 transition"
            >
              {submitting ? "Sending..." : "Send"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
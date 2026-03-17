// app/components/admin/branches/EditBranchCard.tsx
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

type CountryRaw = {
  id: number;
  nameCountry: string;
  companies?: { id: number; nameCompany: string }[];
};

export type BranchPayload = {
  id: number;
  companyId?: number;
  nameBranch?: string;
  name_branch?: string;
  streetAddress?: string | null;
  street_address?: string | null;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  linkMap?: string | null;
  link_map?: string | null;
};

export default function EditBranchCard({
  branchId,
  onUpdated,
  onCancel,
}: {
  branchId?: number | null;
  onUpdated?: () => void;
  onCancel?: () => void;
}) {
  const BASE_API = process.env.NEXT_PUBLIC_BASE_API ?? "";

  const [countries, setCountries] = useState<CountryRaw[]>([]);
  const [companies, setCompanies] = useState<{ id: number; nameCompany: string }[]>([]);
  const [loadingForm, setLoadingForm] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [countryId, setCountryId] = useState<number | "">("");
  const [companyId, setCompanyId] = useState<number | "">("");
  const [nameBranch, setNameBranch] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [linkMap, setLinkMap] = useState("");

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const inputClass =
    "w-full rounded-full border-2 border-gray-300 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#214B62]";
  const labelClass = "block mb-2 font-medium";

  // fetch parallel: countries + branch detail sekaligus
  useEffect(() => {
    if (!branchId) return;
    let mounted = true;

    (async () => {
      setLoadingForm(true);
      try {
        const [countryRes, branchRes] = await Promise.all([
          axios.get(`${BASE_API}/country`),
          axios.get(`${BASE_API}/branch/${branchId}`),
        ]);

        if (!mounted) return;

        // normalize countries
        const payload = countryRes.data?.data ?? countryRes.data;
        const arr = Array.isArray(payload) ? payload : [];
        const normalized: CountryRaw[] = arr.map((c: any) => ({
          id: Number(c.id ?? c.idCountry ?? 0),
          nameCountry: String(c.nameCountry ?? c.name_country ?? ""),
          companies: Array.isArray(c.companies)
            ? c.companies.map((co: any) => ({
                id: Number(co.id ?? co.idCompany ?? 0),
                nameCompany: co.nameCompany ?? co.name_company ?? co.name ?? "",
              }))
            : [],
        }));
        setCountries(normalized);

        // populate branch fields — handle camelCase & snake_case
        const branch: BranchPayload = branchRes.data?.data ?? branchRes.data;
        setNameBranch(branch.nameBranch ?? branch.name_branch ?? "");
        setStreetAddress(branch.streetAddress ?? branch.street_address ?? "");
        setPhone(branch.phone ?? "");
        setEmail(branch.email ?? "");
        setWebsite(branch.website ?? "");
        setLinkMap(branch.linkMap ?? branch.link_map ?? "");

        // resolve countryId dari normalized langsung (bukan state)
        if (branch.companyId) {
          setCompanyId(branch.companyId);
          const foundCountry = normalized.find((c) =>
            c.companies?.some((co) => co.id === branch.companyId)
          );
          if (foundCountry) {
            setCountryId(foundCountry.id);
            setCompanies(foundCountry.companies ?? []);
          }
        }
      } catch (err: any) {
        console.error("Failed to load form data", err);
        setErrorMsg(
          err?.response?.data?.message ?? err?.message ?? "Failed to load data"
        );
      } finally {
        if (mounted) setLoadingForm(false);
      }
    })();

    return () => { mounted = false; };
  }, [BASE_API, branchId]);

  // update companies saat user ganti country dropdown
  useEffect(() => {
    if (!countryId) {
      setCompanies([]);
      return;
    }
    const found = countries.find((c) => c.id === countryId);
    const comps = found?.companies ?? [];
    setCompanies(comps);
    if (companyId && !comps.some((c) => c.id === companyId)) setCompanyId("");
  }, [countryId, countries]);

  function validate() {
    if (!companyId) return "Pilih company terlebih dahulu";
    if (!nameBranch.trim()) return "Nama branch wajib diisi";
    if (email && !/^\S+@\S+\.\S+$/.test(email)) return "Email tidak valid";
    return null;
  }

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const v = validate();
    if (v) { setErrorMsg(v); return; }
    if (!branchId) { setErrorMsg("branchId tidak disediakan"); return; }

    setSubmitting(true);
    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

      const payload = {
        
        nameBranch: nameBranch.trim(),
        streetAddress: streetAddress.trim() || null,
        phone: phone.trim() || null,
        email: email.trim() || null,
        website: website.trim() || null,
        
      };

      await axios.patch(`${BASE_API}/branch/${branchId}`, payload, {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      setSuccessMsg("Branch updated successfully");
      onUpdated?.();
    } catch (err: any) {
      console.error("Update branch failed", err);
      const srv = err?.response?.data;
      let message = "Failed to update branch";
      if (srv) {
        if (typeof srv === "string") message = srv;
        else if (srv.message) message = srv.message;
        else if (srv.errors) message = JSON.stringify(srv.errors);
        else message = JSON.stringify(srv);
      } else if (err?.message) message = err.message;
      setErrorMsg(message);
    } finally {
      setSubmitting(false);
      setTimeout(() => setSuccessMsg(null), 2500);
    }
  }

  if (!branchId) return <div className="p-4 text-sm text-gray-600">branchId not provided</div>;
  if (loadingForm) return <p className="text-center py-10">Loading branch data...</p>;

  return (
    <div className="max-w-[720px] mx-auto bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4">Edit Branch</h3>

      {errorMsg && <div className="mb-4 text-sm text-red-600">{errorMsg}</div>}
      {successMsg && <div className="mb-4 text-sm text-green-600">{successMsg}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={labelClass}>Country</label>
          <select
            value={countryId}
            onChange={(e) => setCountryId(e.target.value ? Number(e.target.value) : "")}
            className={inputClass}
          >
            <option value="">-- pilih country --</option>
            {countries.map((c) => (
              <option key={c.id} value={c.id}>{c.nameCountry}</option>
            ))}
          </select>
        </div>

          <div>
              <label className={labelClass}>Company</label>
              <select
                  value={companyId}
                  disabled  
                  className={`${inputClass} bg-gray-100 cursor-not-allowed opacity-60`}
              >
                  <option value="">{companies.length ? "-- pilih company --" : "Pilih country dulu"}</option>
                  {companies.map((co) => (
                      <option key={co.id} value={co.id}>{co.nameCompany}</option>
                  ))}
              </select>
              <p className="text-xs text-gray-400 mt-1">
                  * Company tidak dapat diubah melalui form ini
              </p>
          </div>

        <div>
          <label className={labelClass}>Branch Name</label>
          <input
            value={nameBranch}
            onChange={(e) => setNameBranch(e.target.value)}
            placeholder="Nama cabang"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Street Address (must exactly match Google Maps)</label>
          <input
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
            placeholder="Alamat jalan"
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Phone (optional)</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0812xxxx"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Email (optional)</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@company.com"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Website (optional)</label>
          <input
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="https://..."
            className={inputClass}
          />
        </div>

       <div>
          <label className={labelClass}>Map Embed Link</label>
          <input
              value={linkMap}
              disabled
              className={`${inputClass} bg-gray-100 cursor-not-allowed opacity-60`}
          />
          <p className="text-xs text-gray-400 mt-1">
              * Link map tidak dapat diubah melalui form ini
          </p>
      </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-[#214B62] text-white px-6 py-3 disabled:opacity-60"
          >
            {submitting ? "Updating..." : "Update Branch"}
          </button>
          <button
            type="button"
            onClick={() => onCancel?.()}
            className="rounded-lg border px-4 py-3"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
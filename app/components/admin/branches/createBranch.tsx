// components/admin/branches/createBranch.tsx
'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Country = {
  id: number;
  nameCountry: string;
  companies?: { id: number; nameCompany: string }[];
};

function createMapEmbed(address: string): string | null {
  if (!address.trim()) return null;
  return `https://www.google.com/maps?q=${encodeURIComponent(address.trim())}&output=embed`;
}

export default function CreateBranchCard({ onCreated }: { onCreated?: () => void }) {
  const BASE_API = process.env.NEXT_PUBLIC_BASE_API ?? '';

  const [countries, setCountries] = useState<Country[]>([]);
  const [companies, setCompanies] = useState<{ id: number; nameCompany: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [countryId, setCountryId] = useState<number | ''>('');
  const [companyId, setCompanyId] = useState<number | ''>('');
  const [nameBranch, setNameBranch] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const inputClass = 'w-full rounded-full border-2 border-gray-300 px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#214B62]';
  const labelClass = 'block mb-2 font-medium';

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${BASE_API}/country`);
        const payload = res.data?.data ?? res.data;
        if (!mounted) return;
        const arr = Array.isArray(payload) ? payload : [];
        const normalized = arr.map((c: any) => ({
          id: Number(c.id ?? c.idCountry ?? 0),
          nameCountry: String(c.nameCountry ?? c.name_country ?? ''),
          companies: Array.isArray(c.companies)
            ? c.companies.map((co: any) => ({
                id: Number(co.id ?? co.idCompany ?? 0),
                nameCompany: co.nameCompany ?? co.name_company ?? co.name ?? '',
              }))
            : [],
        }));
        setCountries(normalized);
      } catch (err: any) {
        setErrorMsg(err?.response?.data?.message ?? err?.message ?? 'Failed to load countries');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [BASE_API]);

  useEffect(() => {
    if (!countryId) {
      setCompanies([]);
      setCompanyId('');
      return;
    }
    const found = countries.find((c) => c.id === countryId);
    const comps = found?.companies ?? [];
    setCompanies(comps);
    if (companyId && !comps.some((c) => c.id === companyId)) setCompanyId('');
  }, [countryId, countries]);

  function validate() {
    if (!countryId) return 'Pilih country terlebih dahulu';
    if (!companyId) return 'Pilih company terlebih dahulu';
    if (!nameBranch.trim()) return 'Nama branch wajib diisi';
    if (email && !/^\S+@\S+\.\S+$/.test(email)) return 'Email tidak valid';
    return null;
  }

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const v = validate();
    if (v) { setErrorMsg(v); return; }

    setSubmitting(true);
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

      const payload = {
        companyId: companyId,
        nameBranch: nameBranch.trim(),
        streetAddress: streetAddress.trim() || null,
        phone: phone.trim() || null,
        email: email.trim() || null,
        website: website.trim() || null,
        linkMap: createMapEmbed(streetAddress), // ← auto-generate
      };

      await axios.post(`${BASE_API}/branch`, payload, {
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      setSuccessMsg('Branch created successfully');
      setNameBranch('');
      setStreetAddress('');
      setPhone('');
      setEmail('');
      setWebsite('');
      setCountryId('');
      setCompanyId('');
      onCreated?.();
    } catch (err: any) {
      const srv = err?.response?.data;
      let message = 'Failed to create branch';
      if (srv) {
        if (typeof srv === 'string') message = srv;
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

  return (
    <div className="max-w-[720px] mx-auto bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4">Create Branch</h3>

      {errorMsg && <div className="mb-4 text-sm text-red-600">{errorMsg}</div>}
      {successMsg && <div className="mb-4 text-sm text-green-600">{successMsg}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={labelClass}>Country</label>
          <select
            value={countryId}
            onChange={(e) => setCountryId(e.target.value ? Number(e.target.value) : '')}
            className={inputClass}
          >
            <option value="">-- pilih country --</option>
            {loading ? (
              <option disabled>Loading...</option>
            ) : (
              countries.map((c) => <option key={c.id} value={c.id}>{c.nameCountry}</option>)
            )}
          </select>
        </div>

        <div>
          <label className={labelClass}>Company</label>
          <select
            value={companyId}
            onChange={(e) => setCompanyId(e.target.value ? Number(e.target.value) : '')}
            className={inputClass}
            disabled={!companies.length}
          >
            <option value="">{companies.length ? '-- pilih company --' : 'Pilih country dulu'}</option>
            {companies.map((co) => <option key={co.id} value={co.id}>{co.nameCompany}</option>)}
          </select>
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

        {/* Street Address + auto map preview */}
        <div>
          <label className={labelClass}>
            Street Address{' '}
            <span className="text-xs font-normal text-gray-400">
              (must exactly match Google Maps)
            </span>
          </label>
          <input
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
            placeholder="116 Vũ Trọng Phụng, Thanh Xuân, Hà Nội"
            className={inputClass}
          />
          {/* map embed preview otomatis */}
          {streetAddress.trim() && (
            <div className="mt-3">
              <p className="text-xs text-gray-500 mb-1">Map preview (auto-generated):</p>
              <iframe
                src={createMapEmbed(streetAddress)!}
                width="100%"
                height="220"
                className="rounded-xl border"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          )}
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

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-[#214B62] text-white px-6 py-3 disabled:opacity-60"
          >
            {submitting ? 'Creating...' : 'Create Branch'}
          </button>
          <button
            type="button"
            onClick={() => {
              setCountryId(''); setCompanyId(''); setNameBranch('');
              setStreetAddress(''); setPhone(''); setEmail('');
              setWebsite(''); setErrorMsg(null); setSuccessMsg(null);
            }}
            className="rounded-lg border px-4 py-3"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

import indoFlag from "../../../public/country/indo.png";
import vietFlag from "../../../public/country/viet.png";
import sngFlag from "../../../public/country/sngpore.png";
import defaultFlag from "../../../public/country/indo.png";
import { StaticImageData } from "next/image";

type BranchLocation = {
  id?: number;
  title: string;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  mapEmbed?: string | null;
};

type CompanyBrief = {
  id: number;
  nameCompany: string;
  branches?: Array<{
    id: number;
    nameBranch?: string;
    streetAddress?: string | null;
    phone?: string | null;
    email?: string | null;
    website?: string | null;
    linkMap?: string | null;
  }>;
};

type CountryApi = {
  id: number;
  nameCountry: string;
  companies?: CompanyBrief[];
};

function getFlagForCountry(name?: string) {
  if (!name) return defaultFlag;
  const low = name.toLowerCase();
  if (low.includes("indonesia") || low.includes("indo")) return indoFlag;
  if (low.includes("viet") || low.includes("vietnam")) return vietFlag;
  if (low.includes("singapore") || low.includes("sg") || low.includes("singap")) return sngFlag;
  return defaultFlag;
}

export default function BranchDropdownClient() {
  const BASE = process.env.NEXT_PUBLIC_BASE_API ?? "";
  const [countries, setCountries] = useState<CountryApi[]>([]);
  const [openKey, setOpenKey] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setErr(null);
      try {
        // fetch /country + /branch parallel
        const [countryRes, branchRes] = await Promise.all([
          fetch(`${BASE}/country`, { cache: "no-store" }),
          fetch(`${BASE}/branch`, { cache: "no-store" }),
        ]);

        if (!countryRes.ok) throw new Error(`Fetch countries failed: ${countryRes.status}`);
        if (!branchRes.ok) throw new Error(`Fetch branches failed: ${branchRes.status}`);

        const countryJson = await countryRes.json();
        const branchJson = await branchRes.json();

        const countryData: CountryApi[] = Array.isArray(countryJson?.data)
          ? countryJson.data
          : [];

        // buat lookup map branchId → full branch data dari /branch
        const branchMap = new Map<number, any>();
        const branchArr = Array.isArray(branchJson?.data) ? branchJson.data : [];
        branchArr.forEach((b: any) => branchMap.set(b.id, b));

        // merge: enrich branches di dalam country dengan full data
        const merged: CountryApi[] = countryData.map((c) => ({
          ...c,
          companies: (c.companies ?? []).map((co) => ({
            ...co,
            branches: (co.branches ?? []).map((b) => {
              const full = branchMap.get(b.id);
              return full ? { ...b, ...full } : b;
            }),
          })),
        }));

        if (!mounted) return;
        setCountries(merged);
      } catch (e: any) {
        if (mounted) setErr(e?.message ?? "Failed to load data");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [BASE]);

  return (
    <section className="w-full py-12">
      <div className="max-w-[1200px] mx-auto space-y-4 px-4">
        {loading && <div className="text-sm text-gray-500">Loading branches...</div>}
        {err && <div className="text-sm text-red-600">{err}</div>}

        {countries.map((c) => {
          const locations: BranchLocation[] = [];
          (c.companies ?? []).forEach((co) => {
            if (Array.isArray(co.branches) && co.branches.length) {
              co.branches.forEach((b) => {
                locations.push({
                  id: b.id,
                  title: b.nameBranch ?? co.nameCompany,
                  address: b.streetAddress ?? undefined,
                  phone: b.phone ?? undefined,
                  email: b.email ?? undefined,
                  website: b.website ?? undefined,
                  mapEmbed: b.linkMap ?? undefined,
                });
              });
            } else {
              locations.push({
                id: co.id,
                title: co.nameCompany,
                address: undefined,
                phone: undefined,
              });
            }
          });

          return (
            <BranchPanel
              key={c.id}
              id={String(c.id)}
              flagSrc={getFlagForCountry(c.nameCountry)}
              titleHighlight={c.nameCountry}
              titleNormal="Branch"
              isOpen={openKey === c.id}
              onToggle={() => setOpenKey((prev) => (prev === c.id ? null : c.id))}
              locations={locations}
            />
          );
        })}

        {countries.length === 0 && !loading && !err && (
          <div className="text-sm text-gray-500">No branch data available.</div>
        )}
      </div>
    </section>
  );
}

/* ---------- BranchPanel ---------- */
function BranchPanel({
  id,
  flagSrc,
  titleHighlight,
  titleNormal,
  isOpen,
  onToggle,
  locations,
}: {
  id: string;
  flagSrc: StaticImageData | string;
  titleHighlight: string;
  titleNormal: string;
  isOpen: boolean;
  onToggle: () => void;
  locations: BranchLocation[];
}) {
  return (
    <div className="rounded-2xl bg-gray-100 overflow-hidden border border-gray-200">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={`branch-${id}`}
        onClick={onToggle}
        className="w-full flex items-center px-6 py-4 text-lg font-medium focus:outline-none"
      >
        <div className="w-10 h-10 relative mr-4 flex-shrink-0">
          <Image src={flagSrc as any} alt={`${titleHighlight} flag`} fill style={{ objectFit: "contain" }} />
        </div>

        <h3 className="flex-1 text-center text-xl font-semibold">
          <span className="text-red-600">{titleHighlight}</span>{" "}
          <span className="text-black">{titleNormal}</span>
        </h3>

        <span className="text-black ml-4 cursor-pointer" aria-hidden>
          {isOpen ? <UpOutlined /> : <DownOutlined />}
        </span>
      </button>

      <div
        id={`branch-${id}`}
        role="region"
        className={`px-6 overflow-hidden transition-[max-height,opacity,padding] duration-300 ease-in-out ${
          isOpen ? "max-h-[1200px] opacity-100 py-6" : "max-h-0 opacity-0 py-0"
        }`}
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            {titleHighlight} branch locations — click a card for details or use the contact phone to reach the office.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {locations.map((loc, idx) => (
              <article
                key={loc.id ?? idx}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col"
              >
                <h4 className="text-lg font-semibold mb-2">{loc.title}</h4>
                <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                  {loc.address ?? "Address not provided"}
                </p>

                <p className="text-sm font-semibold mb-3">
                  Phone : <span className="font-normal">{loc.phone ?? "-"}</span>
                </p>

                {loc.mapEmbed ? (
                  <div className="mt-auto">
                    <div className="w-full rounded-md overflow-hidden border">
                      <iframe
                        title={`${loc.title} map`}
                        src={loc.mapEmbed}
                        className="w-full h-36"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="mt-auto h-36 rounded-md bg-gray-50 border border-dashed border-gray-200 flex items-center justify-center text-xs text-gray-400">
                    Map preview not available
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
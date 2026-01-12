"use client";

import { useState } from "react";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

type SectionKey = "vision" | "mission" | "about" | null;

export default function Vision() {
  

  // START DROPDOWN NULL
  const [open, setOpen] = useState<SectionKey>(null);

  const toggle = (key: SectionKey) => {
    setOpen((prev) => (prev === key ? null : key));
  };

  return (
    <section className="w-full py-24">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

        {/* ====LEFT DESCRIPTION==== */}
        <div>
          <h2 className="text-[48px] font-semibold text-black mb-6">
            Get To Know Us
          </h2>
          <p className="text-gray-700 text-[16px] leading-relaxed max-w-md">
            Welcome to the core of RDS—where our vision, our expertise,
            and our commitment to your success come together.
          </p>
        </div>

        {/* =====RIGHT DROPDOWN==== */}
        <div className="space-y-6">
          {/* Panel component repeated for clarity */}
          <Panel
            id="vision"
            title="Vision"
            isOpen={open === "vision"}
            onToggle={() => toggle("vision")}
          >
            To be the undeniable leader and most sought-after partner in
            Asia’s digital revolution. We achieve this by championing the
            technologies of tomorrow, building deep, collaborative alliances,
            and acting as the essential catalyst for growth. We exist to
            propel enterprises, ignite innovation, and unlock the monumental
            potential of the world's most dynamic continent.
          </Panel>

          <Panel
            id="mission"
            title="Mission"
            isOpen={open === "mission"}
            onToggle={() => toggle("mission")}
          >
            Deliver innovative digital solutions that empower businesses,
            enhance security, and accelerate sustainable growth.
          </Panel>

          <Panel
            id="about"
            title="About Us"
            isOpen={open === "about"}
            onToggle={() => toggle("about")}
          >
            RDS is a trusted digital partner delivering secure, scalable, and
            future-ready technology solutions. We work across industries to
            modernize operations and secure mission-critical data.
          </Panel>
        </div>
      </div>
    </section>
  );
}

// ====PANEL COMPONENT====
function Panel({
  id,
  title,
  children,
  isOpen,
  onToggle,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="rounded-2xl bg-[#234b68] text-white overflow-hidden">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={`panel-${id}`}
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-4 text-lg font-medium focus:outline-none"
      >
        <span>{title}</span>
        <span
          className="bg-white text-black rounded-full p-1 flex items-center justify-center"
          aria-hidden
        >
          {isOpen ? <UpOutlined /> : <DownOutlined />}
        </span>
      </button>

      <div
        id={`panel-${id}`}
        role="region"
        aria-labelledby={id}
        className={`px-6 overflow-hidden transition-[max-height,opacity,padding] duration-300 ease-in-out ${
          isOpen
            ? "max-h-[600px] opacity-100 py-4"
            : "max-h-0 opacity-0 py-0"
        }`}
      >
        <div className="text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

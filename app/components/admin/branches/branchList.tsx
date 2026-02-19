// app/components/branch/BranchList.tsx
"use client";

import React, { useMemo, useState } from "react";
import {
  Row,
  Col,
  Card,
  Avatar,
  Button,
  Input,
  Space,
  Typography,
  Tag,
} from "antd";
import {
  SearchOutlined,
  GlobalOutlined,
  PhoneOutlined,
  MailOutlined,
  LinkOutlined,
  CopyOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

type BranchData = {
  id: number;
  companyId?: number;
  companyName?: string;
  countryName?: string;
  nameBranch: string;
  streetAddress?: string;
  phone?: string;
  email?: string;
  website?: string;
  createdAt?: string;
  updatedAt?: string;
};

// contoh data statis (ambil sesuai JSON yang kamu share)
const SAMPLE_BRANCHES: BranchData[] = [
  {
    id: 1,
    companyId: 1,
    companyName: "rds semarang",
    countryName: "indonesia",
    nameBranch: "rds furry",
    streetAddress: "jl.indraprasta/xx/xx",
    phone: "08139923281",
    email: "rds@gmail.com",
    website: "https://www.rds.co.id",
    createdAt: "2026-02-23T14:39:34.000Z",
    updatedAt: "2026-02-02T14:40:17.000Z",
  },
  {
    id: 2,
    companyId: 1,
    companyName: "rds semarang",
    countryName: "indonesia",
    nameBranch: "RDS Jawa",
    streetAddress: "JL.Jomokerto 4 nomor 65",
    phone: "8734834783493",
    email: "rdsjomokerto@gmail.com",
    website: "https://rdsjomok.co.id",
    createdAt: "2026-02-07T05:12:22.359Z",
    updatedAt: "2026-02-07T05:12:22.359Z",
  },
];

export default function BranchList() {
  const [q, setQ] = useState("");

  // Jika nanti mau ganti ke data lain, ubah SOURCE di sini
  const branches = SAMPLE_BRANCHES;

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return branches;
    return branches.filter((b) => {
      return (
        (b.nameBranch ?? "").toLowerCase().includes(term) ||
        (b.companyName ?? "").toLowerCase().includes(term) ||
        (b.countryName ?? "").toLowerCase().includes(term) ||
        (b.streetAddress ?? "").toLowerCase().includes(term) ||
        String(b.phone ?? "").toLowerCase().includes(term) ||
        (b.email ?? "").toLowerCase().includes(term)
      );
    });
  }, [branches, q]);

  const mapLink = (addr?: string) => {
    if (!addr) return "#";
    const q = encodeURIComponent(addr);
    return `https://www.google.com/maps/search/?api=1&query=${q}`;
  };

  return (
    <section className="w-full">
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <Title level={3} style={{ margin: 0 }}>
              Branches
            </Title>
            <Text type="secondary">Daftar cabang perusahaan (frontend-only)</Text>
          </div>

          <Space>
            <Input
              placeholder="Cari branch, company, country, alamat, atau nomor..."
              prefix={<SearchOutlined />}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              allowClear
              style={{ width: 420 }}
            />
            {/* tombol contoh (dummy) */}
            <Button
              type="primary"
              icon={<LinkOutlined />}
              onClick={() => {
                // placeholder action
                // nanti bisa buka modal tambah branch
                alert("Tambah branch (dummy)");
              }}
            >
              Tambah Branch
            </Button>
          </Space>
        </div>

        <Row gutter={[16, 16]}>
          {filtered.map((b) => (
            <Col key={b.id} xs={24} sm={24} md={12}>
              <Card size="default" className="shadow-sm" bodyStyle={{ padding: 18 }}>
                <div className="flex gap-4 items-start">
                  <Avatar size={64} style={{ backgroundColor: "#f0f0f0" }} icon={<CopyOutlined />} />

                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <Text strong style={{ fontSize: 18 }}>
                            {b.nameBranch}
                          </Text>
                          <Tag color="cyan" style={{ textTransform: "capitalize" }}>
                            {b.countryName ?? "Unknown"}
                          </Tag>
                        </div>

                        <div style={{ marginTop: 6 }}>
                          <Text type="secondary">{b.companyName}</Text>
                        </div>

                        <div style={{ marginTop: 8 }}>
                          <Text type="secondary">
                            <GlobalOutlined />{" "}
                          </Text>
                          <Text style={{ marginLeft: 8 }}>{b.streetAddress ?? "-"}</Text>
                        </div>

                        <div style={{ marginTop: 8, display: "flex", gap: 12, alignItems: "center" }}>
                          <div>
                            <Text type="secondary">
                              <PhoneOutlined />{" "}
                            </Text>
                            <Text style={{ marginLeft: 6 }}>
                              {b.phone ? (
                                <a href={`tel:${b.phone}`}>{b.phone}</a>
                              ) : (
                                "-"
                              )}
                            </Text>
                          </div>

                          <div>
                            <Text type="secondary">
                              <MailOutlined />{" "}
                            </Text>
                            <Text style={{ marginLeft: 6 }}>
                              {b.email ? <a href={`mailto:${b.email}`}>{b.email}</a> : "-"}
                            </Text>
                          </div>

                          <div>
                            <Text type="secondary">
                              <LinkOutlined />{" "}
                            </Text>
                            <Text style={{ marginLeft: 6 }}>
                              {b.website ? (
                                <a href={b.website} target="_blank" rel="noreferrer">
                                  {new URL(b.website).hostname}
                                </a>
                              ) : (
                                "-"
                              )}
                            </Text>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <Space direction="vertical" align="end">
                          <Text type="secondary" style={{ fontSize: 12 }}>
                            {b.createdAt ? new Date(b.createdAt).toLocaleString() : ""}
                          </Text>

                          <Space>
                            <Button
                              type="default"
                              icon={<GlobalOutlined />}
                              href={mapLink(b.streetAddress)}
                              target="_blank"
                            >
                              Lihat Maps
                            </Button>
                          </Space>
                        </Space>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Tidak ada branch yang cocok dengan pencarian.
          </div>
        )}
      </div>
    </section>
  );
}

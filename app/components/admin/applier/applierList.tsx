// app/components/applier/ApplierList.tsx
"use client";

import React, { useMemo, useState, useEffect } from "react";
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
  Tooltip,
  Popconfirm,
  Spin,
  message,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  MailOutlined,
  UserOutlined,
  DeleteOutlined,
  FileTextOutlined,
  EditOutlined,
} from "@ant-design/icons";
import CreateJob from "./createJob"; // sesuaikan path jika beda
import { getAllApply, createApply, deleteApply } from "@/app/data/apply";

const { Title, Text } = Typography;

type Applier = {
  idApply: number;
  nameApply: string;
  emailApply: string;
  phoneNumberApply: string;
  gender: string;
  domicile: string;
  resume: string; // filename / url
  createdAt: string;
  updatedAt?: string;
};

export default function ApplierList() {
  const [appliers, setAppliers] = useState<Applier[]>([]);
  const [q, setQ] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingDeleteId, setLoadingDeleteId] = useState<number | null>(null);

  // fetch data on mount
  useEffect(() => {
    let mounted = true;
    const fetchAll = async () => {
      setLoading(true);
      try {
        const data = await getAllApply();
        // backend returns objects keys maybe idApply etc. ensure shape matches Applier
        if (!mounted) return;
        setAppliers(
          Array.isArray(data)
            ? data.map((it: any) => ({
                idApply: it.idApply ?? it.id ?? 0,
                nameApply: it.nameApply ?? it.nameApply ?? it.name ?? "",
                emailApply: it.emailApply ?? it.email ?? it.emailApply ?? "",
                phoneNumberApply:
                  it.phoneNumberApply ?? it.phoneNumber ?? it.phoneNumberApply ?? "",
                gender: it.gender ?? "Unknown",
                domicile: it.domicile ?? it.domicile ?? "",
                resume: it.resume ?? it.resume ?? "",
                createdAt: it.createdAt ?? it.created_at ?? "",
                updatedAt: it.updatedAt ?? it.updated_at ?? "",
              }))
            : []
        );
      } catch (err: any) {
        console.error("fetchAll error", err);
        message.error(
          err?.message ? `Gagal memuat pelamar: ${err.message}` : "Gagal memuat pelamar"
        );
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchAll();
    return () => {
      mounted = false;
    };
  }, []);

  // filter hasil pencarian (nama, email, domicile)
  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return appliers;
    return appliers.filter((a) => {
      return (
        a.nameApply.toLowerCase().includes(term) ||
        a.emailApply.toLowerCase().includes(term) ||
        a.domicile.toLowerCase().includes(term) ||
        String(a.phoneNumberApply).toLowerCase().includes(term)
      );
    });
  }, [appliers, q]);

  const handleDelete = async (id: number) => {
    setLoadingDeleteId(id);
    try {
      await deleteApply(id);
      setAppliers((prev) => prev.filter((p) => p.idApply !== id));
      message.success("Pelamar dihapus");
    } catch (err) {
      console.error("delete error", err);
      message.error("Gagal menghapus pelamar");
    } finally {
      setLoadingDeleteId(null);
    }
  };

  // jika CreateJob mengembalikan job baru, kita hanya tutup modal (job berbeda dari applier)
  const handleCreatedJob = (created: any) => {
    console.log("Job created:", created);
    setCreateOpen(false);
    message.success("Job berhasil dibuat (dummy)");
  };

  const formatDate = (iso?: string) =>
    iso ? new Date(iso).toLocaleString() : "-";

  return (
  <section className="w-full bg-gray-50 min-h-screen">
    <div className="max-w-[1200px] mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <div>
          <Title level={3} style={{ margin: 0 }}>
            Manajemen Pelamar
          </Title>
          <Text type="secondary">
            Kelola daftar pelamar, lihat resume, dan lakukan aksi cepat
          </Text>
        </div>

        <Space size="middle">
          <Input
            placeholder="Cari nama, email, kota, atau nomor..."
            prefix={<SearchOutlined />}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            allowClear
            size="large"
            className="rounded-xl"
            style={{ width: 320 }}
          />

          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            className="rounded-xl shadow-sm"
            onClick={() => setCreateOpen(true)}
          >
            Tambah Job
          </Button>
        </Space>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="py-20 flex justify-center">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <Row gutter={[16, 16]}>
            {filtered.map((applier) => (
              <Col key={applier.idApply} xs={24}>
                <Card
                  bordered={false}
                  className="rounded-2xl shadow-sm hover:shadow-md transition-all duration-200"
                  bodyStyle={{ padding: 20 }}
                >
                  <div className="flex gap-4 items-start">
                    {/* Avatar */}
                    <Avatar
                      size={64}
                      icon={<UserOutlined />}
                      className="bg-blue-500"
                    />

                    {/* Content */}
                    <div className="flex-1">
                      {/* Top row */}
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <Text strong style={{ fontSize: 17 }}>
                              {applier.nameApply}
                            </Text>

                            <Tag
                              className="rounded-full px-3"
                              color={
                                applier.gender === "Male"
                                  ? "blue"
                                  : applier.gender === "Female"
                                  ? "magenta"
                                  : "default"
                              }
                            >
                              {applier.gender}
                            </Tag>
                          </div>

                          <Text type="secondary">
                            <MailOutlined /> {applier.emailApply}
                          </Text>
                        </div>

                        {/* Actions */}
                        <Space>
                          <Tooltip title="Edit">
                            <Button
                              shape="circle"
                              icon={<EditOutlined />}
                              className="hover:bg-gray-100"
                              onClick={() => {
                                message.info("Fitur edit belum tersedia");
                              }}
                            />
                          </Tooltip>

                          <Popconfirm
                            title="Hapus pelamar ini?"
                            onConfirm={() => handleDelete(applier.idApply)}
                            okText="Hapus"
                            cancelText="Batal"
                          >
                            <Tooltip title="Hapus">
                              <Button
                                danger
                                shape="circle"
                                icon={<DeleteOutlined />}
                                loading={loadingDeleteId === applier.idApply}
                              />
                            </Tooltip>
                          </Popconfirm>
                        </Space>
                      </div>

                      {/* Info grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
                        <div className="bg-gray-50 rounded-xl px-4 py-2">
                          <Text type="secondary">Nomor HP</Text>
                          <div>
                            <Text>{applier.phoneNumberApply}</Text>
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-xl px-4 py-2">
                          <Text type="secondary">Domisili</Text>
                          <div>
                            <Text>{applier.domicile}</Text>
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-xl px-4 py-2">
                          <Text type="secondary">Resume</Text>
                          <div>
                            <Button
                              type="link"
                              href={`#${applier.resume}`}
                              icon={<FileTextOutlined />}
                              target="_blank"
                            >
                              Lihat Resume
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="mt-4 text-right">
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          Dikirim: {formatDate(applier.createdAt)}
                        </Text>
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="text-center py-20">
              <div className="text-gray-400 text-lg">
                Tidak ada pelamar ditemukan
              </div>
              <div className="text-gray-400 text-sm">
                Coba kata kunci lain atau tambah pelamar baru
              </div>
            </div>
          )}
        </>
      )}
    </div>
  </section>
);

}

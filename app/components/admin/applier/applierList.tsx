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
    <section className="w-full">
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <Title level={3} style={{ margin: 0 }}>
              Manajemen Pelamar
            </Title>
            <Text type="secondary">Kelola daftar pelamar dan lihat resume</Text>
          </div>

          <Space>
            <Input
              placeholder="Cari nama, email, atau kota..."
              prefix={<SearchOutlined />}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              allowClear
              style={{ width: 340 }}
            />

            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setCreateOpen(true)}
            >
              Tambah Job
            </Button>
          </Space>
        </div>

        {/* loading */}
        {loading ? (
          <div className="py-16 flex justify-center">
            <Spin size="large" />
          </div>
        ) : (
          <>
            {/* list cards */}
            <Row gutter={[16, 16]}>
              {filtered.map((applier) => (
                <Col key={applier.idApply} xs={24}>
                  <Card
                    size="default"
                    className="shadow-sm"
                    bodyStyle={{ padding: 20 }}
                    extra={
                      <Space>
                        <Tooltip title="Edit">
                          <Button
                            shape="circle"
                            icon={<EditOutlined />}
                            onClick={() => {
                              // placeholder edit action
                              console.log("edit", applier.idApply);
                              message.info("Fitur edit belum diimplementasikan");
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
                    }
                  >
                    <div className="flex gap-4 items-center">
                      <Avatar size={64} icon={<UserOutlined />} />

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <Text strong style={{ fontSize: 18 }}>
                              {applier.nameApply}
                            </Text>{" "}
                            <Tag color={applier.gender === "Male" ? "blue" : "magenta"}>
                              {applier.gender}
                            </Tag>
                            <div style={{ marginTop: 6 }}>
                              <Text type="secondary">
                                <MailOutlined />{" "}
                              </Text>
                              <Text style={{ marginLeft: 6 }}>{applier.emailApply}</Text>
                            </div>
                          </div>

                          <div className="text-right">
                            <Text type="secondary" style={{ fontSize: 12 }}>
                              Dikirim: {formatDate(applier.createdAt)}
                            </Text>
                          </div>
                        </div>

                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <Text type="secondary">Nomor HP</Text>
                            <div>
                              <Text>{applier.phoneNumberApply}</Text>
                            </div>
                          </div>

                          <div>
                            <Text type="secondary">Domisili</Text>
                            <div>
                              <Text>{applier.domicile}</Text>
                            </div>
                          </div>

                          <div>
                            <Text type="secondary">Resume</Text>
                            <div className="mt-1">
                              <Button
                                type="link"
                                href={`#${applier.resume}`}
                                icon={<FileTextOutlined />}
                                target="_blank"
                              >
                                {applier.resume}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>

            {/* jika kosong */}
            {filtered.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                Tidak ada pelamar yang cocok dengan pencarian.
              </div>
            )}
          </>
        )}
      </div>

      
    </section>
  );
}

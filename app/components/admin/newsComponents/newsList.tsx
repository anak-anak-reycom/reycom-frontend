// app/components/news/NewsList.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Row,
  Col,
  Card,
  Avatar,
  Button,
  Input,
  Space,
  Typography,
  Tooltip,
  Spin,
  message,
  Modal,
  Form,
} from "antd";
import axios from "axios";
import { Search as SearchIcon, Plus as PlusIcon, Image as ImageIcon } from "lucide-react";

const { Title, Text } = Typography;

type NewsItem = {
  id?: number | string;
  title: string;
  content?: string;
  imageNews?: string;
  createdAt?: string;
};

const BASE_API = process.env.NEXT_PUBLIC_BASE_API || "http://localhost:3000";

export default function NewsList() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  // fetch news
  useEffect(() => {
    let mounted = true;
    const fetchNews = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${BASE_API}/news`);
        // adapt depending on API shape (here: res.data.data or res.data)
        const data = res.data?.data ?? res.data ?? [];
        if (!mounted) return;
        setNews(
          Array.isArray(data)
            ? data.map((n: any) => ({
                id: n.id ?? n.idNews ?? n._id,
                title: n.title ?? n.titleNews ?? "",
                content: n.content ?? "",
                imageNews: n.imageNews ?? n.image ?? "",
                createdAt: n.createdAt ?? n.created_at ?? n.createdAt,
              }))
            : []
        );
      } catch (err: any) {
        console.error("fetch news error", err);
        message.error(err?.message ? `Gagal memuat berita: ${err.message}` : "Gagal memuat berita");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchNews();
    return () => {
      mounted = false;
    };
  }, []);

  // search filter (title or content)
  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return news;
    return news.filter((n) => {
      return (
        (n.title ?? "").toLowerCase().includes(term) ||
        (n.content ?? "").toLowerCase().includes(term)
      );
    });
  }, [news, q]);

  const formatDate = (iso?: string) => (iso ? new Date(iso).toLocaleString() : "-");

  // create news (simple: image url, title, content)
  const onCreate = async (values: { title: string; content?: string; imageNews?: string }) => {
    setCreating(true);
    try {
      const res = await axios.post(`${BASE_API}/news`, {
        title: values.title,
        content: values.content,
        imageNews: values.imageNews,
      });

      // assume API returns created object
      const created = res.data?.data ?? res.data ?? res.data?.created ?? null;
      if (created) {
        setNews((prev) => [created, ...prev]);
      } else {
        // fallback: push the posted payload with a generated id
        setNews((prev) => [{ id: Date.now(), ...values }, ...prev]);
      }

      message.success("Berita berhasil dibuat");
      setCreateOpen(false);
    } catch (err: any) {
      console.error("create news error", err);
      message.error(err?.message ? `Gagal membuat berita: ${err.message}` : "Gagal membuat berita");
    } finally {
      setCreating(false);
    }
  };

  return (
    <section className="w-full">
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <Title level={3} style={{ margin: 0 }}>
              Manajemen Berita
            </Title>
            <Text type="secondary">Kelola daftar berita — tampilan image kecil + judul.</Text>
          </div>

          <Space>
            <Input
              placeholder="Cari judul atau isi berita..."
              prefix={<SearchIcon size={16} />}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              allowClear
              style={{ width: 340 }}
            />

            <Button
              type="primary"
              icon={<PlusIcon size={14} />}
              onClick={() => setCreateOpen(true)}
            >
              Tambah News
            </Button>
          </Space>
        </div>

        {loading ? (
          <div className="py-16 flex justify-center">
            <Spin size="large" />
          </div>
        ) : (
          <>
            <Row gutter={[16, 16]}>
              {filtered.map((item) => (
                <Col key={item.id ?? item.title} xs={24}>
                  <Card
                    size="default"
                    className="shadow-sm"
                    bodyStyle={{ padding: 12, width: "100%" }}
                    style={{ width: "100%" }}
                  >
                    <div className="flex items-center gap-4">
                      {/* small square image (left) */}
                      <div className="flex-shrink-0">
                        {item.imageNews ? (
                          <Avatar
                            shape="square"
                            size={80}
                            src={item.imageNews}
                            icon={<ImageIcon />}
                          />
                        ) : (
                          <Avatar shape="square" size={80} icon={<ImageIcon />} />
                        )}
                      </div>

                      {/* content: title + meta */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <Text strong style={{ fontSize: 18 }}>
                              {item.title}
                            </Text>
                            <div style={{ marginTop: 6 }}>
                              <Text type="secondary" ellipsis style={{ maxWidth: 600 }}>
                                {item.content ?? ""}
                              </Text>
                            </div>
                          </div>

                          <div className="text-right">
                            <Text type="secondary" style={{ fontSize: 12 }}>
                              {formatDate(item.createdAt)}
                            </Text>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>

            {filtered.length === 0 && (
              <div className="text-center py-12 text-gray-500">Tidak ada berita.</div>
            )}
          </>
        )}
      </div>

      {/* Modal create */}
      <Modal
        title="Tambah Berita"
        open={createOpen}
        onCancel={() => setCreateOpen(false)}
        footer={null}
        destroyOnClose
      >
        <Form layout="vertical" onFinish={onCreate}>
          <Form.Item
            name="title"
            label="Judul"
            rules={[{ required: true, message: "Masukkan judul berita" }]}
          >
            <Input placeholder="Judul berita" />
          </Form.Item>

          <Form.Item name="content" label="Konten">
            <Input.TextArea rows={4} placeholder="Isi singkat / ringkasan (opsional)" />
          </Form.Item>

          <Form.Item name="imageNews" label="URL Gambar (opsional)">
            <Input placeholder="https://..." />
          </Form.Item>

          <Form.Item>
            <div className="flex justify-end">
              <Space>
                <Button onClick={() => setCreateOpen(false)}>Batal</Button>
                <Button type="primary" htmlType="submit" loading={creating}>
                  Buat
                </Button>
              </Space>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </section>
  );
}
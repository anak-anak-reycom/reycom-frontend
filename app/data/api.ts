
export const BASE_API =  process.env.NEXT_PUBLIC_BASE_API || "http://localhost:3000";

export async function parseApiResponse<T>(res: Response): Promise<T> {
  const text = await res.text().catch(() => "");
  // coba parse JSON jika memungkinkan
  let maybeJson: any = null;
  try {
    maybeJson = text ? JSON.parse(text) : null;
  } catch (e) {
    maybeJson = null;
  }

  if (!res.ok) {
    // log lengkap untuk debugging di console
    console.error("[API ERROR]", {
      url: res.url,
      status: res.status,
      statusText: res.statusText,
      bodyText: text,
      bodyJson: maybeJson,
    });

    // pilih pesan error dari JSON jika ada, kalau tidak pakai text
    const message =
      (maybeJson && (maybeJson.message || maybeJson.error || JSON.stringify(maybeJson))) ||
      text ||
      `Request failed with status ${res.status}`;

    throw new Error(message);
  }

  // berhasil
  if (maybeJson && "data" in maybeJson) return maybeJson.data as T;
  if (maybeJson) return maybeJson as T;
  // kalau server mengembalikan plain text
  return (text as unknown) as T;
}
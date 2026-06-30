import type { VercelRequest, VercelResponse } from "@vercel/node";
import { put, list } from "@vercel/blob";

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method === "GET") {
    const { url, prefix } = req.query as { url?: string; prefix?: string };
    if (url) return res.redirect(302, url as string);
    try {
      const { blobs } = await list({ prefix: prefix as string | undefined });
      return res.status(200).json({ blobs });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  if (req.method === "POST") {
    const { filename } = req.query as { filename?: string };
    if (!filename) return res.status(400).json({ error: "filename query param is required" });
    try {
      const chunks: Buffer[] = [];
      for await (const chunk of req) {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
      }
      const buffer = Buffer.concat(chunks);
      const contentType = (req.headers["content-type"] as string) || "application/octet-stream";
      const blob = await put(filename as string, buffer, {
        access: "public",
        contentType,
        addRandomSuffix: true,
      });
      return res.status(200).json({ url: blob.url, pathname: blob.pathname, contentType: blob.contentType, size: buffer.length });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}

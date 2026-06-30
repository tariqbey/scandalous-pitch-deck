/**
 * Vercel Blob Storage API
 * POST /api/blob?filename=<name>  → upload a file, returns { url, pathname }
 * GET  /api/blob?url=<blobUrl>    → redirect to a blob URL (proxy helper)
 *
 * Requires BLOB_READ_WRITE_TOKEN environment variable set in Vercel dashboard.
 */
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { put, list } from "@vercel/blob";

export const config = {
  api: {
    bodyParser: false, // We handle raw body for uploads
  },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // ── GET: list blobs or redirect to a blob URL ────────────────────────────────
  if (req.method === "GET") {
    const { url, prefix } = req.query as { url?: string; prefix?: string };

    if (url) {
      // Redirect to blob URL
      return res.redirect(302, url as string);
    }

    // List blobs with optional prefix filter
    try {
      const { blobs } = await list({ prefix: prefix as string | undefined });
      return res.status(200).json({ blobs });
    } catch (err: any) {
      console.error("[Blob] list error:", err);
      return res.status(500).json({ error: err.message });
    }
  }

  // ── POST: upload a file ──────────────────────────────────────────────────────
  if (req.method === "POST") {
    const { filename } = req.query as { filename?: string };

    if (!filename) {
      return res.status(400).json({ error: "filename query param is required" });
    }

    try {
      // Collect raw body chunks
      const chunks: Buffer[] = [];
      for await (const chunk of req) {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
      }
      const buffer = Buffer.concat(chunks);

      const contentType =
        (req.headers["content-type"] as string) || "application/octet-stream";

      const blob = await put(filename as string, buffer, {
        access: "public",
        contentType,
        addRandomSuffix: true,
      });

      return res.status(200).json({
        url: blob.url,
        pathname: blob.pathname,
        contentType: blob.contentType,
        size: buffer.length,
      });
    } catch (err: any) {
      console.error("[Blob] upload error:", err);
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}

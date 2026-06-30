import type { VercelRequest, VercelResponse } from "@vercel/node";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "../server/routers";
import { sdk } from "../server/_core/sdk";
import { parse as parseCookieHeader } from "cookie";
import { COOKIE_NAME } from "../shared/const";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const protocol = (req.headers["x-forwarded-proto"] as string) || "https";
  const host = req.headers.host || "localhost";
  const url = `${protocol}://${host}${req.url}`;

  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (value) {
      if (Array.isArray(value)) {
        value.forEach((v) => headers.append(key, v));
      } else {
        headers.set(key, value);
      }
    }
  }

  let body: string | undefined;
  if (req.method !== "GET" && req.method !== "HEAD") {
    body = typeof req.body === "string" ? req.body : JSON.stringify(req.body);
    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }
  }

  const request = new Request(url, { method: req.method, headers, body });

  const response = await fetchRequestHandler({
    endpoint: "/api/trpc",
    req: request,
    router: appRouter,
    createContext: async () => {
      let user = null;
      try {
        const cookieHeader = req.headers.cookie as string | undefined;
        if (cookieHeader) {
          const cookies = parseCookieHeader(cookieHeader);
          const sessionCookie = cookies[COOKIE_NAME];
          if (sessionCookie) {
            const session = await sdk.verifySession(sessionCookie);
            if (session) {
              const { getDb } = await import("../server/db");
              const db = await getDb();
              if (db) {
                const { users } = await import("../drizzle/schema");
                const { eq } = await import("drizzle-orm");
                const rows = await db.select().from(users).where(eq(users.openId, session.openId)).limit(1);
                user = rows[0] ?? null;
              }
            }
          }
        }
      } catch { user = null; }
      return { req: req as any, res: res as any, user };
    },
    onError({ error, path }) {
      console.error(`[tRPC] Error on ${path}:`, error.message);
    },
  });

  res.status(response.status);
  response.headers.forEach((value, key) => res.setHeader(key, value));
  const responseBody = await response.text();
  res.send(responseBody);
}

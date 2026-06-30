/**
 * Vercel Serverless Function: GET /api/oauth/callback
 * Handles the OAuth authorization code exchange and sets the session cookie.
 */
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { COOKIE_NAME, ONE_YEAR_MS } from "../../shared/const";
import { sdk } from "../../server/_core/sdk";
import * as db from "../../server/db";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const code = req.query.code as string | undefined;
  const state = req.query.state as string | undefined;

  if (!code || !state) {
    return res.status(400).json({ error: "code and state are required" });
  }

  try {
    const tokenResponse = await sdk.exchangeCodeForToken(code, state);
    const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);

    if (!userInfo.openId) {
      return res.status(400).json({ error: "openId missing from user info" });
    }

    await db.upsertUser({
      openId: userInfo.openId,
      name: userInfo.name || null,
      email: userInfo.email ?? null,
      loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
      lastSignedIn: new Date(),
    });

    const sessionToken = await sdk.createSessionToken(userInfo.openId, {
      name: userInfo.name || "",
      expiresInMs: ONE_YEAR_MS,
    });

    const isSecure =
      (req.headers["x-forwarded-proto"] as string) === "https" ||
      process.env.NODE_ENV === "production";

    res.setHeader(
      "Set-Cookie",
      `${COOKIE_NAME}=${sessionToken}; Path=/; HttpOnly; SameSite=None; ${isSecure ? "Secure; " : ""}Max-Age=${Math.floor(ONE_YEAR_MS / 1000)}`
    );

    res.setHeader("Location", "/");
    return res.status(302).end();
  } catch (error) {
    console.error("[OAuth] Callback failed", error);
    return res.status(500).json({ error: "OAuth callback failed" });
  }
}

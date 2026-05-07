import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { notifyOwner } from "./_core/notification";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { accessLogs } from "../drizzle/schema";
import { desc } from "drizzle-orm";
import { z } from "zod";

// ── Named access codes ────────────────────────────────────────────────────────
const ACCESS_CODES: Record<string, { name: string; organization: string }> = {
  "2077": { name: "Owner",       organization: "Upscale Promotions & Entertainment, Inc." },
  "1972": { name: "Malik Davis", organization: "Upscale Promotions & Entertainment, Inc." },
  "4021": { name: "Jeff Clanagan", organization: "Hartbeat" },
  "5555": { name: "James",       organization: "Guest" },
};

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  vault: router({
    logAccess: publicProcedure
      .input(z.object({ code: z.string().max(10) }))
      .mutation(async ({ input, ctx }) => {
        const entry = ACCESS_CODES[input.code];
        if (!entry) return { valid: false, name: null, organization: null };

        const ipAddress =
          (ctx.req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
          (ctx.req.socket as any)?.remoteAddress ||
          "Unknown";
        const userAgent = ctx.req.headers["user-agent"] || "Unknown";
        const accessedAt = new Date();

        try {
          const db = await getDb();
          if (db) {
            await db.insert(accessLogs).values({
              code: input.code,
              accessorName: entry.name,
              organization: entry.organization,
              ipAddress,
              userAgent,
              accessedAt,
            });
          }
        } catch (err) {
          console.error("[VaultAccess] DB log failed:", err);
        }

        const dateStr = accessedAt.toLocaleString("en-US", {
          timeZone: "America/New_York",
          dateStyle: "full",
          timeStyle: "short",
        });

        notifyOwner({
          title: `🔐 Deck Accessed — ${entry.name}`,
          content: `Accessor: ${entry.name}\nOrganization: ${entry.organization}\nCode: ${input.code}\nTime (ET): ${dateStr}\nIP: ${ipAddress}`,
        }).catch(() => {});

        return { valid: true, name: entry.name, organization: entry.organization };
      }),

    getLogs: publicProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      return db
        .select()
        .from(accessLogs)
        .orderBy(desc(accessLogs.accessedAt))
        .limit(100);
    }),
  }),
});

export type AppRouter = typeof appRouter;

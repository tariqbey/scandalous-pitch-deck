/**
 * build-api.mjs
 * Bundles the Vercel serverless API functions with esbuild so all
 * server-side imports (server/routers, shared/*, drizzle/*) are
 * included in the output and Vercel can run them without node_modules.
 *
 * Output: api/trpc.js, api/blob.js, api/oauth/callback.js
 * These replace the TypeScript source files in-place for the Vercel deployment.
 */

import { build } from "esbuild";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const sharedOptions = {
  bundle: true,
  platform: "node",
  format: "esm",
  target: "node20",
  // Keep node built-ins and Vercel runtime external; bundle everything else
  external: [
    "node:*",
    "mysql2",
    "mysql2/promise",
    "@aws-sdk/*",
  ],
  // Path aliases matching tsconfig
  alias: {
    "@shared": resolve(__dirname, "shared"),
    "@": resolve(__dirname, "client/src"),
  },
  define: {
    "process.env.NODE_ENV": '"production"',
  },
  logLevel: "info",
};

const entries = [
  {
    entryPoints: [resolve(__dirname, "api/trpc.ts")],
    outfile: resolve(__dirname, "api/trpc.js"),
  },
  {
    entryPoints: [resolve(__dirname, "api/blob.ts")],
    outfile: resolve(__dirname, "api/blob.js"),
  },
  {
    entryPoints: [resolve(__dirname, "api/oauth/callback.ts")],
    outfile: resolve(__dirname, "api/oauth/callback.js"),
  },
];

for (const entry of entries) {
  console.log(`\nBundling ${entry.entryPoints[0]}...`);
  await build({
    ...sharedOptions,
    ...entry,
  });
  console.log(`✓ ${entry.outfile}`);
}

console.log("\n✓ All API functions bundled successfully.");

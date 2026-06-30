/**
 * build-api.mjs
 * Bundles the Vercel serverless API functions with esbuild.
 * Uses CJS format to avoid "Dynamic require" issues with Node.js built-ins.
 */

import { build } from "esbuild";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const sharedOptions = {
  bundle: true,
  platform: "node",
  format: "cjs",          // CJS avoids "Dynamic require of X is not supported"
  target: "node20",
  // Keep only true native Node.js built-ins external; bundle everything else
  external: [
    "node:*",
    "mysql2",
    "mysql2/promise",
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

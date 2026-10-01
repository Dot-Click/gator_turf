import vinext from "vinext";
import { defineConfig } from "vite";
import { readExecutionProfile } from "./scripts/execution-profile.mjs";
import { sites } from "./build/sites-vite-plugin";

// macOS Seatbelt blocks FSEvents, so Codex previews need polling for HMR.
const isCodexSeatbeltSandbox = process.env.CODEX_SANDBOX === "seatbelt";
const managedLinux = readExecutionProfile() === "managed-linux";

// This site builds as a static export (see next.config.ts: output: "export")
// and deploys to Vercel, so it never runs on Cloudflare Workers. There is no
// Cloudflare plugin, D1/R2 bindings, or wrangler dev server here.
export default defineConfig(() => ({
  server: {
    ...(managedLinux ? { host: "0.0.0.0", allowedHosts: ["terminal.local"] } : {}),
    ...(isCodexSeatbeltSandbox ? { watch: { useFsEvents: false, usePolling: true } } : {}),
  },
  plugins: [
    vinext(),
    sites({ mockAuth: !managedLinux }),
  ],
}));

import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

export default defineConfig([
  ...nextVitals,
  globalIgnores([
    "**/.next/**",
    "**/node_modules/**",
    "**/generated/**",
    "**/coverage/**",
    "**/dist/**",
    "**/build/**",
    "**/out/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      // react-hooks v7 introduced set-state-in-effect which blocks standard
      // data-fetching patterns (setLoading / setError inside useEffect).
      // This is valid React usage per the official docs.
      "react-hooks/set-state-in-effect": "off",
    },
  },
]);

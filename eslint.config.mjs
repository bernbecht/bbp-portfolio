import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Constitution Principle III: enforced by tooling instead of review.
      "@typescript-eslint/consistent-type-imports": "error",
      "comma-dangle": ["error", "always-multiline"],
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            { group: ["./*", "../*"], message: "Use the @/* alias instead of relative imports." },
          ],
        },
      ],
    },
  },
  {
    // Constitution Principle II: route files stay Server Components.
    files: ["app/**/page.tsx", "app/**/layout.tsx"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector: "ExpressionStatement[directive='use client']",
          message: "Route files must be Server Components. Move interactivity into a leaf component.",
        },
      ],
    },
  },
  {
    // Constitution Principle VI: raster images go through next/image.
    rules: { "@next/next/no-img-element": "error" },
  },
  {
    // Node scripts run outside the bundler, so they need relative imports with extensions.
    files: ["scripts/**"],
    rules: { "no-restricted-imports": "off" },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;

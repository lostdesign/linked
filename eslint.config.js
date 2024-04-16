import globals from "globals";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";

export default [
  { languageOptions: { globals: globals.browser } },
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  {
    ignores: [
      ".husky/",
      "src-tauri/",
      "node_modules/",
      "public/",
      "pnpm-lock.yaml",
      "*.config.js",
    ],
  },
];

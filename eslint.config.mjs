// eslint.config.mjs
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import { defineConfig } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import {
  defineConfigWithVueTs,
  vueTsConfigs,
} from "@vue/eslint-config-typescript";
import pluginPrettier from "eslint-plugin-prettier";

export default defineConfig([
  // ✅ 基础 JavaScript 规则（推荐）
  {
    ...js.configs.recommended,
    files: ["**/*.{js,cjs,mjs,ts,cts,mts}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        sourceType: "module",
        ecmaVersion: "latest",
      },
      globals: globals.browser,
    },
  },

  // ✅ Vue 3 基础规则
  pluginVue.configs["flat/essential"],

  // ✅ 为 .vue 文件额外指定 parser
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        extraFileExtensions: [".vue"],
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
  },

  // ✅ Vue + TypeScript 推荐配置（含类型）
  defineConfigWithVueTs(vueTsConfigs.recommended),

  // ✨ 开启 Prettier 的 ESLint 插件规则
  {
    name: "prettier-rules",
    plugins: { prettier: pluginPrettier },
    rules: {
      "prettier/prettier": "error", // 这样 ESLint 才会识别格式问题
    },
  },

  // ✅ Prettier 最后防止格式冲突
  eslintConfigPrettier,
]);

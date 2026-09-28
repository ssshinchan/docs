import 'dotenv/config';
import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  locales: {
    "/": {
      lang: "en-US",
      title: "Docs",
      description: "Docs",
    },
    "/ja/": {
      lang: "ja-JP",
      title: "Docs",
      description: "技術ドキュメント",
    },
  },

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,

  markdown: {
    headers: {
      level: [1, 2, 3, 4, 5, 6],
    },
  },
});

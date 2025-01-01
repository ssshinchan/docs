import { sidebar } from "vuepress-theme-hope";

export const enSidebar = sidebar({
  "/": [
    "",
    {
      text: "Question",
      icon: "book",
      prefix: "question/",
      children: "structure",
      collapsible: true,
    },
    {
      text: "Note",
      icon: "book",
      prefix: "note/",
      children: "structure",
      collapsible: true,
    },
    {
      text: "Japanese",
      icon: "book",
      prefix: "japanese/",
      children: "structure",
      collapsible: true,
    },
    {
      text: "Demo",
      icon: "laptop-code",
      prefix: "demo/",
      link: "demo/",
      children: "structure",
    },
    {
      text: "Docs",
      icon: "book",
      prefix: "guide/",
      children: "structure",
    },
    {
      text: "Slides",
      icon: "person-chalkboard",
      link: "https://plugin-md-enhance.vuejs.press/guide/content/revealjs/demo.html",
    },
  ],
});

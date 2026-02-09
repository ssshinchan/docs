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
      text:"Examination",
      icon:"book",
      prefix:"examination/",
      children: "structure",
      collapsible: true,
    }
  ],
});

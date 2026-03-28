import type { GlobalConfig } from "payload";

export const CurrentBook: GlobalConfig = {
  slug: "current-book",
  label: "Aktuelle Buchempfehlung",
  fields: [
    { name: "title", type: "text", required: true, admin: { placeholder: "Der große Gatsby" } },
    { name: "author", type: "text", required: true, admin: { placeholder: "F. Scott Fitzgerald" } },
    { name: "description", type: "textarea" },
    { name: "cover_image", type: "upload", relationTo: "media" },
  ],
};

import type { CollectionConfig } from "payload";

export const Formats: CollectionConfig = {
  slug: "formats",
  admin: { useAsTitle: "title" },
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.title) {
              return data.title
                .toLowerCase()
                .replace(/[äÄ]/g, "ae").replace(/[öÖ]/g, "oe").replace(/[üÜ]/g, "ue").replace(/ß/g, "ss")
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");
            }
            return value;
          },
        ],
      },
    },
    { name: "description", type: "richText", required: true },
    {
      name: "icon",
      type: "select",
      required: true,
      options: [
        { label: "Book", value: "Book" },
        { label: "BookOpen", value: "BookOpen" },
        { label: "Coffee", value: "Coffee" },
        { label: "Users", value: "Users" },
        { label: "Repeat", value: "Repeat" },
        { label: "Sparkles", value: "Sparkles" },
        { label: "MessageCircle", value: "MessageCircle" },
        { label: "Music", value: "Music" },
      ],
    },
    {
      name: "color",
      type: "select",
      required: true,
      defaultValue: "rose",
      options: [
        { label: "Rose", value: "rose" },
        { label: "Wine", value: "wine" },
        { label: "Botanical", value: "botanical" },
        { label: "Gold", value: "gold" },
      ],
    },
    { name: "featured_image", type: "upload", relationTo: "media" },
  ],
};

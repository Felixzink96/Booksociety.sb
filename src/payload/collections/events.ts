import type { CollectionConfig } from "payload";

export const Events: CollectionConfig = {
  slug: "events",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "date", "event_type", "location_name"],
  },
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: { position: "sidebar" },
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
    { name: "date", type: "date", required: true, admin: { date: { pickerAppearance: "dayOnly" } } },
    { name: "time", type: "text", required: true, admin: { placeholder: "19:00" } },
    {
      name: "event_type",
      type: "select",
      required: true,
      options: [
        { label: "Lesekreis", value: "lesekreis" },
        { label: "Büchertausch", value: "buechertausch" },
        { label: "Leseabend", value: "leseabend" },
        { label: "Sonstiges", value: "sonstiges" },
      ],
    },
    { name: "description", type: "richText", required: true },
    {
      name: "location",
      type: "group",
      fields: [
        { name: "name", type: "text", required: true, admin: { placeholder: "Café Lesesaal" } },
        { name: "address", type: "text", admin: { placeholder: "Musterstr. 1, 66111 Saarbrücken" } },
        { name: "lat", type: "number", admin: { step: 0.000001 } },
        { name: "lng", type: "number", admin: { step: 0.000001 } },
      ],
    },
    { name: "featured_image", type: "upload", relationTo: "media" },
  ],
};

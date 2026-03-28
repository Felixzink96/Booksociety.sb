import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site Einstellungen",
  fields: [
    { name: "site_title", type: "text", defaultValue: "Booksociety Saarbrücken" },
    { name: "site_description", type: "textarea", defaultValue: "Dein Buchclub in Saarbrücken - Gemeinsam lesen, gemeinsam erleben." },
    { name: "instagram_url", type: "text", defaultValue: "https://www.instagram.com/booksociety.sb" },
    { name: "tagline", type: "text", defaultValue: "Gemeinsam lesen. Gemeinsam erleben." },
  ],
};

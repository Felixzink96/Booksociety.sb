import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { fileURLToPath } from "url";

import { Users } from "./src/payload/collections/users";
import { Media } from "./src/payload/collections/media";
import { Events } from "./src/payload/collections/events";
import { Formats } from "./src/payload/collections/formats";
import { SiteSettings } from "./src/payload/globals/site-settings";
import { CurrentBook } from "./src/payload/globals/current-book";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: { user: Users.slug },
  collections: [Users, Media, Events, Formats],
  globals: [SiteSettings, CurrentBook],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  db: postgresAdapter({ pool: { connectionString: process.env.DATABASE_URI || "" } }),
});

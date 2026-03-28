import configPromise from "@payload-config";
import { getPayload } from "payload";

let payloadClient: Awaited<ReturnType<typeof getPayload>> | null = null;

export async function getPayloadClient() {
  if (payloadClient) return payloadClient;
  try {
    payloadClient = await getPayload({ config: configPromise });
    return payloadClient;
  } catch (e) {
    console.warn("[Payload] DB not connected yet - using fallbacks");
    throw e;
  }
}

export async function getEvents({ upcoming = true }: { upcoming?: boolean } = {}) {
  const payload = await getPayloadClient();
  const now = new Date().toISOString();
  const result = await payload.find({
    collection: "events",
    sort: upcoming ? "date" : "-date",
    where: upcoming
      ? { date: { greater_than_equal: now } }
      : { date: { less_than: now } },
    limit: 50,
  });
  return result.docs;
}

export async function getEventBySlug(slug: string) {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "events",
    where: { slug: { equals: slug } },
    limit: 1,
  });
  return result.docs[0] ?? null;
}

export async function getNextEvent() {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "events",
    sort: "date",
    where: { date: { greater_than_equal: new Date().toISOString() } },
    limit: 1,
  });
  return result.docs[0] ?? null;
}

export async function getFormats() {
  const payload = await getPayloadClient();
  const result = await payload.find({ collection: "formats", limit: 50 });
  return result.docs;
}

export async function getFormatBySlug(slug: string) {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "formats",
    where: { slug: { equals: slug } },
    limit: 1,
  });
  return result.docs[0] ?? null;
}

export async function getCurrentBook() {
  const payload = await getPayloadClient();
  return payload.findGlobal({ slug: "current-book" });
}

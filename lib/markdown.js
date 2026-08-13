import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIRECTORY = path.join(process.cwd(), "content");

function toArray(value) {
  if (Array.isArray(value)) return value;
  if (typeof value === "string" && value.trim()) return [value.trim()];
  return [];
}

function requireText(entry, field, collection) {
  const value = entry[field];

  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${collection}/${entry.slug}.md is missing required field: ${field}`);
  }

  return value.trim();
}

function readCollection(collection) {
  const directory = path.join(CONTENT_DIRECTORY, collection);

  if (!fs.existsSync(directory)) return [];

  return fs
    .readdirSync(directory)
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const source = fs.readFileSync(path.join(directory, filename), "utf8");
      const { data, content } = matter(source);

      return { slug, ...data, content: content.trim() };
    })
    .filter((entry) => entry.published !== false)
    .sort((left, right) => (left.order ?? 0) - (right.order ?? 0));
}

function normalizeOrganization(entry) {
  return {
    slug: entry.slug,
    name: requireText(entry, "name", "organizations"),
    description: requireText(entry, "content", "organizations"),
    cause: entry.cause || "",
    department: entry.department || "",
    city: entry.city || "",
    address: entry.address || "",
    addressUrl: entry.addressUrl || "",
    donationUrl: entry.donationUrl || "",
    contactUrl: entry.contactUrl || "",
    contactLabel: entry.contactLabel || "",
    largeDonationsContact: entry.largeDonationsContact || "",
    spendingTowards: entry.spendingTowards || "",
    accomplishmentsUrl: entry.accomplishmentsUrl || "",
    backedBy: entry.backedBy || "",
    paymentMethods: toArray(entry.paymentMethods),
    acceptsCrypto: Boolean(entry.acceptsCrypto),
    social: {
      instagram: entry.instagramUrl || "",
      facebook: entry.facebookUrl || "",
      twitter: entry.twitterUrl || "",
    },
    websiteUrl: entry.websiteUrl || "",
    imageUrl: entry.bannerImageUrl || entry.bannerImage || "/logo-help-colombia.png",
    smallFundraiser: Boolean(entry.smallFundraiser),
  };
}

function normalizePaymentMethod(entry) {
  return {
    slug: entry.slug,
    name: requireText(entry, "name", "payment-methods"),
    howTo: entry.howTo || "",
    pros: toArray(entry.pros),
    cons: toArray(entry.cons),
    availableInColombia: Boolean(entry.availableInColombia),
    availableInternationally: Boolean(entry.availableInternationally),
    serviceRegion: entry.serviceRegion || "",
    requirements: entry.requirements || "",
  };
}

export function getOrganizations() {
  return readCollection("organizations").map(normalizeOrganization);
}

export function getOrganization(slug) {
  return getOrganizations().find((organization) => organization.slug === slug) || null;
}

export function getPaymentMethods() {
  return readCollection("payment-methods").map(normalizePaymentMethod);
}

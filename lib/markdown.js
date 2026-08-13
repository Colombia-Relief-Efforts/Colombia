import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content");

function readCollection(collection) {
  const directory = path.join(contentDirectory, collection);

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

function list(value) {
  return Array.isArray(value) ? value.join(", ") : value || "";
}

function organizationToRow(organization) {
  return [
    organization.name || organization.slug,
    organization.donationUrl || "",
    organization.largeDonationsContact || "",
    organization.content,
    organization.cause || "",
    organization.spendingTowards || "",
    organization.accomplishmentsUrl || "",
    organization.backedBy || "",
    list(organization.paymentMethods),
    organization.acceptsCrypto ? "yes" : "",
    organization.instagramUrl || "",
    organization.facebookUrl || "",
    organization.twitterUrl || "",
    organization.websiteUrl || "",
    organization.bannerImage || "",
    organization.smallFundraiser ? "Yes" : "",
    organization.bannerImageUrl || organization.bannerImage || "",
    organization.slug,
  ];
}

function paymentMethodToRow(paymentMethod) {
  return [
    paymentMethod.name || paymentMethod.slug,
    paymentMethod.howTo || "",
    list(paymentMethod.pros),
    list(paymentMethod.cons),
    paymentMethod.availableInUkraine ? "Yes" : "No",
    paymentMethod.availableInternationally ? "Yes" : "No",
    paymentMethod.serviceRegion || "",
    paymentMethod.requirements || "",
  ];
}

export const organizationHeadings = [
  "Organization",
  "Donation links",
  "Large donations contact",
  "Description",
  "Cause",
  "Spending towards",
  "Accomplishments",
  "Backed by",
  "Payment methods",
  "Crypto",
  "Instagram",
  "Facebook",
  "Twitter",
  "Website",
  "Banner image",
  "Small fundraiser",
  "Banner image URL",
];

export const paymentMethodHeadings = [
  "Method",
  "How to",
  "Pros",
  "Cons",
  "Available in Ukraine",
  "Available internationally",
  "Service region",
  "What's needed",
];

export function getOrganizations() {
  return readCollection("organizations").map(organizationToRow);
}

export function getOrganization(slug) {
  const organization = readCollection("organizations").find((entry) => entry.slug === slug);
  return organization ? organizationToRow(organization) : null;
}

export function getPaymentMethods() {
  return readCollection("payment-methods").map(paymentMethodToRow);
}

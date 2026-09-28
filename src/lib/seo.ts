import { absoluteUrl } from "./site";

type MetaArgs = {
  title: string;
  description: string;
  path: string;
  image?: string | null;
  type?: "website" | "article";
  publishedTime?: string | null;
  noindex?: boolean;
};

export function buildHead({
  title,
  description,
  path,
  image,
  type = "website",
  publishedTime,
  noindex,
}: MetaArgs) {
  const url = absoluteUrl(path);
  const absImage = image && image.startsWith("http") ? image : null;
  const meta: Array<Record<string, string>> = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:url", content: url },
    { property: "og:site_name", content: "Studio Parotelli" },
    { property: "og:locale", content: "it_IT" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ];
  if (absImage) {
    meta.push({ property: "og:image", content: absImage });
    meta.push({ name: "twitter:image", content: absImage });
  }
  if (publishedTime) meta.push({ property: "article:published_time", content: publishedTime });
  if (noindex) meta.push({ name: "robots", content: "noindex, nofollow" });

  return {
    meta,
    links: [{ rel: "canonical", href: url }],
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export const accountingServiceLd = {
  "@context": "https://schema.org",
  "@type": "AccountingService",
  name: "Studio Parotelli",
  legalName: "SP Consulting",
  url: absoluteUrl("/"),
  email: "info@studioparotelli.com",
  telephone: "+39 02 303 106 92",
  vatID: "13446740964",
  areaServed: "Milano",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Via Benigno Crespi 19",
    postalCode: "20159",
    addressLocality: "Milano",
    addressRegion: "MI",
    addressCountry: "IT",
  },
};

export function ldScript(data: unknown) {
  return { type: "application/ld+json", children: JSON.stringify(data) };
}

export function stripHtml(html: string, max = 160) {
  const text = html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#8217;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}

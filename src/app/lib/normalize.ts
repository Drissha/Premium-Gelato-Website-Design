import { API_BASE_URL } from "./api";

const toText = (value: unknown, fallback = ""): string => {
  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  return fallback;
};

const toNumber = (value: unknown, fallback = 0): number => {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number.parseFloat(value.replace(/[^0-9.-]/g, ""));
    return Number.isFinite(parsed) ? parsed : fallback;
  }

  return fallback;
};

const stripHtml = (value: string) =>
  value
    .replace(/<\/(p|div|li|h[1-6])>/gi, "\n\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]*>/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n[ \t]+/g, "\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();

const resolveImageUrl = (value: unknown, fallback: string) => {
  const text = toText(value, "");

  if (!text) {
    return fallback;
  }

  if (/^(https?:)?\/\//i.test(text) || text.startsWith("data:") || text.startsWith("blob:")) {
    return text;
  }

  const origin = new URL(API_BASE_URL).origin;
  const cleaned = text.replace(/^\/+/, "");
  return `${origin}/storage/${cleaned}`;
};

const toNameList = (value: unknown) => {
  if (Array.isArray(value)) {
    return value.map((item) => toText(item)).filter(Boolean);
  }

  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    const nestedName = toText(record.name ?? record.title ?? record.slug, "");
    return nestedName ? [nestedName] : [];
  }

  const text = toText(value, "");
  return text ? [text] : [];
};

const getRelationName = (value: unknown) => {
  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    return toText(record.name ?? record.title ?? record.slug, "");
  }

  return "";
};

export interface NormalizedProduct {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  description: string;
  price: string;
  rating: number;
  image: string;
  seasonal: boolean;
}

export function normalizeProduct(raw: unknown, index = 0): NormalizedProduct {
  const record = (raw ?? {}) as Record<string, unknown>;
  const name = toText(record.name ?? record.title ?? record.product_name, `Product ${index + 1}`);
  const categoryFromRelation = toNameList(record.category);
  const category = categoryFromRelation.length
    ? categoryFromRelation.join(", ")
    : toText(
        record.category_name ??
          record.type ??
          (record.category_id !== undefined ? `Category ${record.category_id}` : undefined),
        "All"
      );
  const subcategoryFromRelation = getRelationName(record.sub_category);
  const subcategory = toText(
    subcategoryFromRelation ||
      toText(record.subcategory ?? record.sub_category ?? record.variant, "") ||
      (record.sub_category_id !== undefined ? `Subcategory ${record.sub_category_id}` : undefined),
    ""
  );
  const description = toText(
    record.description ?? record.excerpt ?? record.short_description ?? record.meta_description,
    "Premium gelato crafted with love."
  );
  const priceValue = record.price ?? record.amount ?? record.sale_price ?? record.price_text;
  const rating = toNumber(record.rating ?? record.review_rating ?? record.stars, 4.8);
  const image = resolveImageUrl(
    record.image ?? record.image_url ?? record.thumbnail ?? record.thumbnail_url ?? record.photo ?? record.cover_image,
    "https://images.unsplash.com/photo-1570197788417-0fca7a94f1e3?auto=format&fit=crop&w=1200&q=80"
  );
  const seasonal = Boolean(record.seasonal ?? record.is_seasonal ?? false);

  return {
    id: String(record.id ?? record.slug ?? name.toLowerCase().replace(/\s+/g, "-")),
    name,
    category,
    subcategory,
    description: stripHtml(description),
    price:
      typeof priceValue === "string"
        ? /^\s*\d/.test(priceValue)
          ? `$${toNumber(priceValue, 0).toFixed(2)}`
          : priceValue
        : `$${toNumber(priceValue, 0).toFixed(2)}`,
    rating,
    image,
    seasonal,
  };
}

export interface NormalizedBlog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  readingTime: string;
  tags: string[];
}

export function normalizeBlog(raw: unknown, index = 0): NormalizedBlog {
  const record = (raw ?? {}) as Record<string, unknown>;
  const title = toText(record.title ?? record.name ?? record.heading, `Blog Post ${index + 1}`);
  const contentSource = toText(
    record.content ?? record.body ?? record.description ?? record.meta_description ?? record.summary,
    ""
  );
  const cleanedContent = stripHtml(contentSource);
  const excerpt = toText(
    record.excerpt ?? record.short_description ?? record.summary,
    cleanedContent.slice(0, 160) || "Latest gelato stories and behind-the-scenes notes."
  );
  const author = toText(record.author ?? record.user_name ?? record.writer, "Letsgo Gelato");
  const date = toText(record.published_at ?? record.created_at ?? record.date ?? record.posted_at, "");
  const image = toText(
    record.image ?? record.image_url ?? record.thumbnail ?? record.thumbnail_url ?? record.cover_image,
    "https://images.unsplash.com/photo-1481931098730-318b6f776db0?auto=format&fit=crop&w=1200&q=80"
  );
  const readingTime = toText(record.reading_time ?? record.read_time, "3 min read");
  const tags = Array.isArray(record.tags)
    ? record.tags.map((tag) => toText(tag)).filter(Boolean)
    : typeof record.tags === "string"
      ? record.tags.split(",").map((tag) => tag.trim()).filter(Boolean)
      : [];

  return {
    id: String(record.id ?? record.slug ?? title.toLowerCase().replace(/\s+/g, "-")),
    title,
    excerpt,
    content: cleanedContent || excerpt,
    author,
    date,
    image,
    readingTime,
    tags,
  };
}

export interface NormalizedLocation {
  id: string;
  name: string;
  city: string;
  area: string;
  address: string;
  hours: string;
  phone: string;
  highlight: string;
  directionLink: string;
  image: string;
}

export function normalizeLocation(raw: unknown, index = 0): NormalizedLocation {
  const record = (raw ?? {}) as Record<string, unknown>;
  const name = toText(record.name ?? record.title ?? record.branch_name, `Location ${index + 1}`);
  const city = toText(record.city ?? record.kota ?? record.region ?? record.area_city, "Unknown");
  const area = toText(record.area ?? record.daerah ?? record.district ?? record.subcity, city);
  const address = toText(record.address ?? record.location ?? record.full_address, "Address unavailable");
  const hours = toText(record.hours ?? record.open_shop ?? record.opening_hours ?? record.business_hours, "Daily: 10am-9pm");
  const phone = toText(record.phone ?? record.phone_number ?? record.contact, "Contact unavailable");
  const highlight = toText(record.highlight ?? record.note ?? record.description, "Visit our store");
  const directionLink = toText(record.directionLink ?? record.direction_link ?? record.google_maps_url ?? record.map_link, "");
  const image = toText(record.image ?? record.image_url ?? record.thumbnail ?? record.cover_image, "");

  return {
    id: String(record.id ?? record.slug ?? name.toLowerCase().replace(/\s+/g, "-")),
    name,
    city,
    area,
    address,
    hours,
    phone,
    highlight,
    directionLink,
    image,
  };
}

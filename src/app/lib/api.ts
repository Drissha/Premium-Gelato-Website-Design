export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") ?? "http://localhost:8000/api";

type QueryValue = string | number | boolean | null | undefined;

function buildUrl(path: string, query?: Record<string, QueryValue>) {
  const url = new URL(path.replace(/^\//, ""), `${API_BASE_URL}/`);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, String(value));
      }
    });
  }

  return url.toString();
}

async function fetchJson<T>(path: string, query?: Record<string, QueryValue>): Promise<T> {
  const response = await fetch(buildUrl(path, query), {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export type ApiListResponse<T> = T[] | { data?: T[]; items?: T[]; results?: T[]; payload?: T[] };
export type ApiItemResponse<T> = T | { data?: T; item?: T; payload?: T };

function unwrapArrayCandidate(value: unknown): unknown[] | null {
  if (Array.isArray(value)) {
    return value;
  }

  if (!value || typeof value !== "object") {
    return null;
  }

  const record = value as Record<string, unknown>;
  const nestedCandidates = [record.data, record.items, record.results, record.payload];

  for (const candidate of nestedCandidates) {
    if (Array.isArray(candidate)) {
      return candidate;
    }

    if (candidate && typeof candidate === "object") {
      const nestedRecord = candidate as Record<string, unknown>;
      const deeperCandidates = [nestedRecord.data, nestedRecord.items, nestedRecord.results, nestedRecord.payload];

      for (const deeper of deeperCandidates) {
        if (Array.isArray(deeper)) {
          return deeper;
        }
      }
    }
  }

  return null;
}

export function unwrapList<T>(response: ApiListResponse<T> | unknown): T[] {
  const candidate = unwrapArrayCandidate(response);

  if (candidate) {
    return candidate as T[];
  }

  return [];
}

export function unwrapNestedList<T>(response: unknown): T[] {
  if (!response || typeof response !== "object") {
    return [];
  }

  const record = response as Record<string, unknown>;
  const topLevelData = record.data;

  if (Array.isArray(topLevelData)) {
    return topLevelData as T[];
  }

  if (topLevelData && typeof topLevelData === "object") {
    const nested = topLevelData as Record<string, unknown>;
    const nestedCandidates = [nested.data, nested.items, nested.results, nested.payload];

    for (const candidate of nestedCandidates) {
      if (Array.isArray(candidate)) {
        return candidate as T[];
      }
    }
  }

  return unwrapList<T>(response);
}

export function unwrapItem<T>(response: ApiItemResponse<T> | unknown): T | null {
  if (!response || typeof response !== "object") {
    return null;
  }

  if (Array.isArray(response)) {
    return (response[0] ?? null) as T | null;
  }

  const record = response as Record<string, unknown>;
  const candidate = record.data ?? record.item ?? record.payload ?? response;

  if (candidate && typeof candidate === "object") {
    const nested = candidate as Record<string, unknown>;
    const nestedItem = nested.data ?? nested.item ?? nested.payload;

    if (nestedItem !== undefined) {
      if (Array.isArray(nestedItem)) {
        return (nestedItem[0] ?? null) as T | null;
      }

      return nestedItem as T;
    }
  }

  if (Array.isArray(candidate)) {
    return (candidate[0] ?? null) as T | null;
  }

  return candidate as T;
}

export async function getProducts(params: { perPage?: number; status?: number | string; search?: string } = {}) {
  return fetchJson<ApiListResponse<unknown>>("/products", {
    per_page: params.perPage ?? 15,
    status: params.status ?? 1,
    search: params.search ?? "",
  });
}

export async function getProductById(id: string | number) {
  return fetchJson<ApiItemResponse<unknown>>(`/products/${id}`);
}

export async function getBlogs() {
  return fetchJson<ApiListResponse<unknown>>("/blogs");
}

export async function getBlogById(id: string | number) {
  return fetchJson<ApiItemResponse<unknown>>(`/blogs/${id}`);
}

export async function getLocations() {
  return fetchJson<ApiListResponse<unknown>>("/locations");
}

export async function getPromotions() {
  return fetchJson<ApiListResponse<unknown>>("/promotions");
}

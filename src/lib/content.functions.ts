import { createServerFn } from "@tanstack/react-start";
import { createPublicServerClient } from "@/server/supabase-public";

const PAGE_FIELDS =
  "id, slug, path, title, content_html, excerpt, featured_image, seo_title, seo_description, published_at, updated_at";
const POST_FIELDS =
  "id, slug, path, title, content_html, excerpt, featured_image, seo_title, seo_description, published_at, updated_at";
const POST_CARD_FIELDS = "id, slug, path, title, excerpt, featured_image, published_at";

export type PageRecord = {
  id: string;
  slug: string;
  path: string;
  title: string;
  content_html: string;
  excerpt: string | null;
  featured_image: string | null;
  seo_title: string | null;
  seo_description: string | null;
  published_at: string | null;
  updated_at: string;
};

export type PostCard = {
  id: string;
  slug: string;
  path: string;
  title: string;
  excerpt: string | null;
  featured_image: string | null;
  published_at: string;
};

function normalizePath(path: string) {
  let p = path.startsWith("/") ? path : `/${path}`;
  if (!p.endsWith("/")) p += "/";
  return p;
}

export const getPageByPath = createServerFn({ method: "GET" })
  .inputValidator((input: { path: string }) => input)
  .handler(async ({ data }): Promise<PageRecord | null> => {
    const supabase = createPublicServerClient();
    const { data: row } = await supabase
      .from("pages")
      .select(PAGE_FIELDS)
      .eq("path", normalizePath(data.path))
      .maybeSingle();
    return (row as PageRecord | null) ?? null;
  });

export const getPostByPath = createServerFn({ method: "GET" })
  .inputValidator((input: { path: string }) => input)
  .handler(async ({ data }): Promise<PageRecord | null> => {
    const supabase = createPublicServerClient();
    const { data: row } = await supabase
      .from("posts")
      .select(POST_FIELDS)
      .eq("path", normalizePath(data.path))
      .eq("status", "publish")
      .maybeSingle();
    return (row as PageRecord | null) ?? null;
  });

export const listPosts = createServerFn({ method: "GET" })
  .inputValidator((input: { page?: number; perPage?: number; q?: string }) => input)
  .handler(async ({ data }): Promise<{ items: PostCard[]; total: number }> => {
    const perPage = data.perPage ?? 9;
    const page = Math.max(1, data.page ?? 1);
    const from = (page - 1) * perPage;
    const supabase = createPublicServerClient();
    let query = supabase
      .from("posts")
      .select(POST_CARD_FIELDS, { count: "exact" })
      .eq("status", "publish")
      .order("published_at", { ascending: false })
      .range(from, from + perPage - 1);
    const q = (data.q ?? "").trim();
    if (q) query = query.or(`title.ilike.%${q}%,excerpt.ilike.%${q}%`);
    const { data: rows, count } = await query;
    return { items: (rows as PostCard[] | null) ?? [], total: count ?? 0 };
  });

export const getRelatedPosts = createServerFn({ method: "GET" })
  .inputValidator((input: { excludePath: string; limit?: number }) => input)
  .handler(async ({ data }): Promise<PostCard[]> => {
    const supabase = createPublicServerClient();
    const { data: rows } = await supabase
      .from("posts")
      .select(POST_CARD_FIELDS)
      .eq("status", "publish")
      .neq("path", data.excludePath)
      .order("published_at", { ascending: false })
      .limit(data.limit ?? 3);
    return (rows as PostCard[] | null) ?? [];
  });

export const listAllPaths = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = createPublicServerClient();
  const [pages, posts] = await Promise.all([
    supabase.from("pages").select("path, updated_at"),
    supabase.from("posts").select("path, updated_at").eq("status", "publish"),
  ]);
  return {
    pages: pages.data ?? [],
    posts: posts.data ?? [],
  };
});

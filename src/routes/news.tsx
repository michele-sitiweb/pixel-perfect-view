import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { listPosts } from "@/lib/content.functions";
import { buildHead, breadcrumbLd } from "@/lib/seo";
import { PostCardItem } from "@/components/site/PostCardItem";
import { Button } from "@/components/ui/button";

const PER_PAGINA = 9;

type Ricerca = { page?: number; q?: string };

export const Route = createFileRoute("/news")({
  validateSearch: (search: Record<string, unknown>): Ricerca => ({
    page: search["page"] ? Number(search["page"]) || 1 : undefined,
    q: typeof search["q"] === "string" && search["q"] ? String(search["q"]) : undefined,
  }),
  loaderDeps: ({ search }) => ({ page: search.page ?? 1, q: search.q ?? "" }),
  loader: async ({ deps }) =>
    listPosts({ data: { page: deps.page, perPage: PER_PAGINA, q: deps.q } }),
  head: ({ match }) => {
    const page = match.search.page ?? 1;
    return buildHead({
      title:
        page > 1
          ? `News e approfondimenti — pagina ${page} | Studio Parotelli`
          : "News e approfondimenti fiscali | Studio Parotelli",
      description:
        "Aggiornamenti su fisco, lavoro, società e adempimenti a cura dello Studio Parotelli di Milano.",
      path: "/news/",
      noindex: page > 1,
    });
  },
  component: News,
});

function News() {
  const { items, total } = Route.useLoaderData();
  const { page = 1, q = "" } = Route.useSearch();
  const navigate = useNavigate();
  const pagine = Math.max(1, Math.ceil(total / PER_PAGINA));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: "News", path: "/news/" },
            ]),
          ),
        }}
      />

      <section className="border-b border-border bg-secondary">
        <div className="container-page py-14 md:py-20">
          <p className="eyebrow">News</p>
          <h1 className="mt-3 max-w-3xl font-serif text-3xl leading-tight md:text-5xl">
            Approfondimenti su fisco, lavoro e società
          </h1>
          <form
            className="mt-8 flex max-w-xl gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              const value = String(new FormData(e.currentTarget).get("q") ?? "").trim();
              navigate({
                to: "/news/",
                search: value ? { q: value, page: undefined } : { q: undefined, page: undefined },
              });
            }}
          >
            <label className="sr-only" htmlFor="ricerca-news">
              Cerca negli articoli
            </label>
            <input
              id="ricerca-news"
              name="q"
              defaultValue={q}
              placeholder="Cerca un argomento"
              className="w-full border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground/40"
            />
            <Button type="submit" variant="brand">
              <Search className="size-4" aria-hidden />
              Cerca
            </Button>
          </form>
          {q ? (
            <p className="mt-3 text-sm text-muted-foreground">
              {total} risultati per “{q}”.{" "}
              <Link to="/news/" search={{ q: undefined, page: undefined }} className="underline">
                Azzera la ricerca
              </Link>
            </p>
          ) : null}
        </div>
      </section>

      <div className="container-page py-14 md:py-20">
        {items.length === 0 ? (
          <p className="text-muted-foreground">Nessun articolo trovato.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((post) => (
              <PostCardItem key={post.id} post={post} />
            ))}
          </div>
        )}

        {pagine > 1 ? (
          <nav className="mt-12 flex flex-wrap items-center justify-center gap-2" aria-label="Pagine">
            {Array.from({ length: pagine }, (_, i) => i + 1).map((n) => (
              <Link
                key={n}
                to="/news/"
                search={{ page: n === 1 ? undefined : n, q: q || undefined }}
                className={
                  n === page
                    ? "border border-foreground bg-foreground px-3.5 py-2 text-sm text-background"
                    : "border border-border px-3.5 py-2 text-sm transition-colors hover:border-foreground/40"
                }
              >
                {n}
              </Link>
            ))}
          </nav>
        ) : null}
      </div>
    </>
  );
}

import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getPostByPath, getRelatedPosts } from "@/lib/content.functions";
import { buildHead, breadcrumbLd, ldScript, stripHtml } from "@/lib/seo";
import { absoluteUrl, formatDataIt, tempoDiLettura } from "@/lib/site";
import { Prose } from "@/components/site/Prose";
import { ContactAside } from "@/components/site/ContactAside";
import { PostCardItem } from "@/components/site/PostCardItem";

export const Route = createFileRoute("/$year/$month/$day/$slug")({
  loader: async ({ params }) => {
    const path = `/${params.year}/${params.month}/${params.day}/${params.slug}/`;
    const post = await getPostByPath({ data: { path } });
    if (!post) throw notFound();
    const correlati = await getRelatedPosts({ data: { excludePath: path, limit: 3 } });
    return { post, correlati, path };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Articolo non disponibile" }, { name: "robots", content: "noindex" }] };
    }
    const { post, path } = loaderData;
    return buildHead({
      title: post.seo_title ?? `${post.title} | Studio Parotelli`,
      description: post.seo_description ?? stripHtml(post.excerpt ?? post.content_html),
      path,
      type: "article",
      publishedTime: post.published_at,
    });
  },
  component: Articolo,
});

function Articolo() {
  const { post, correlati, path } = Route.useLoaderData();
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    mainEntityOfPage: absoluteUrl(path),
    author: { "@type": "Organization", name: "Studio Parotelli" },
    publisher: { "@type": "Organization", name: "Studio Parotelli" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbLd([
              { name: "Home", path: "/" },
              { name: "News", path: "/news/" },
              { name: post.title, path },
            ]),
          ),
        }}
      />

      <article>
        <header className="border-b border-border bg-secondary">
          <div className="container-page py-14 md:py-20">
            <nav aria-label="Percorso" className="eyebrow mb-4 flex flex-wrap gap-2">
              <Link to="/" className="hover:text-foreground">
                Home
              </Link>
              <span aria-hidden>/</span>
              <Link to="/news/" className="hover:text-foreground">
                News
              </Link>
            </nav>
            <h1 className="max-w-4xl font-serif text-3xl leading-tight md:text-5xl">
              {post.title}
            </h1>
            <p className="mt-5 text-sm text-muted-foreground">
              {post.published_at ? (
                <time dateTime={post.published_at}>{formatDataIt(post.published_at)}</time>
              ) : null}
              <span aria-hidden> · </span>
              {tempoDiLettura(post.content_html)} minuti di lettura
            </p>
          </div>
        </header>

        <div className="container-page grid gap-12 py-14 lg:grid-cols-[minmax(0,1fr)_20rem] md:py-20">
          <Prose html={post.content_html} />
          <ContactAside />
        </div>
      </article>

      {correlati.length > 0 ? (
        <section className="border-t border-border bg-secondary">
          <div className="container-page py-14 md:py-20">
            <h2 className="font-serif text-2xl md:text-3xl">Continua a leggere</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {correlati.map((p) => (
                <PostCardItem key={p.id} post={p} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}

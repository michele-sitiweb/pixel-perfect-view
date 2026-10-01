import { Link } from "@tanstack/react-router";
import type { PostCard } from "@/lib/content.functions";
import { formatDataIt } from "@/lib/site";

export function PostCardItem({ post }: { post: PostCard }) {
  return (
    <article className="group flex h-full flex-col border border-border bg-card transition-colors hover:border-foreground/30">
      {post.featured_image ? (
        <img
          src={post.featured_image}
          alt=""
          loading="lazy"
          decoding="async"
          className="aspect-[16/9] w-full object-cover"
        />
      ) : (
        <div className="aspect-[16/9] w-full bg-secondary" aria-hidden />
      )}
      <div className="flex flex-1 flex-col p-5">
        <time dateTime={post.published_at} className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
          {formatDataIt(post.published_at)}
        </time>
        <h3 className="mt-2 font-serif text-lg leading-snug">
          <Link to={post.path} className="after:absolute after:inset-0 group-hover:underline">
            {post.title}
          </Link>
        </h3>
        {post.excerpt ? (
          <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">{post.excerpt}</p>
        ) : null}
      </div>
    </article>
  );
}

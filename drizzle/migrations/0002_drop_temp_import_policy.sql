drop policy "tmp import pages" on public.pages;
drop policy "tmp import posts" on public.posts;
revoke insert on public.pages from anon;
revoke insert on public.posts from anon;
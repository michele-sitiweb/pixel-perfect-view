grant insert on public.pages to anon;
grant insert on public.posts to anon;
create policy "tmp import pages" on public.pages for insert to anon with check (true);
create policy "tmp import posts" on public.posts for insert to anon with check (true);
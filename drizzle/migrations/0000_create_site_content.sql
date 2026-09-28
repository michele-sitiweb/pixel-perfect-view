-- Roles
create type public.app_role as enum ('admin', 'editor');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create policy "Utenti vedono i propri ruoli" on public.user_roles
for select to authenticated using (user_id = auth.uid());

-- Pagine importate da WordPress
create table public.pages (
  id uuid primary key default gen_random_uuid(),
  wp_id integer unique,
  slug text not null,
  path text not null unique,
  title text not null,
  content_html text not null default '',
  excerpt text,
  featured_image text,
  seo_title text,
  seo_description text,
  published_at timestamptz,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);
grant select on public.pages to anon, authenticated;
grant select, insert, update, delete on public.pages to authenticated;
grant all on public.pages to service_role;
alter table public.pages enable row level security;
create policy "Pagine visibili a tutti" on public.pages for select using (true);
create policy "Admin gestiscono le pagine" on public.pages for all to authenticated
using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- Articoli
create table public.posts (
  id uuid primary key default gen_random_uuid(),
  wp_id integer unique,
  slug text not null,
  path text not null unique,
  title text not null,
  content_html text not null default '',
  excerpt text,
  featured_image text,
  seo_title text,
  seo_description text,
  status text not null default 'publish',
  published_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);
create index posts_published_at_idx on public.posts (published_at desc);
grant select on public.posts to anon, authenticated;
grant select, insert, update, delete on public.posts to authenticated;
grant all on public.posts to service_role;
alter table public.posts enable row level security;
create policy "Articoli pubblicati visibili a tutti" on public.posts for select using (status = 'publish');
create policy "Admin gestiscono gli articoli" on public.posts for all to authenticated
using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- Richieste di contatto
create table public.contact_requests (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  email text not null,
  telefono text,
  azienda text,
  servizio text,
  messaggio text,
  origine text not null default 'contatti',
  consenso_privacy boolean not null default false,
  created_at timestamptz not null default now()
);
grant all on public.contact_requests to service_role;
grant select on public.contact_requests to authenticated;
alter table public.contact_requests enable row level security;
create policy "Admin leggono le richieste" on public.contact_requests for select to authenticated
using (public.has_role(auth.uid(), 'admin'));
-- Contact form leads from the Novum website
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 1 and 200),
  email text not null check (char_length(email) between 3 and 320),
  company text not null check (char_length(company) between 1 and 200),
  industry text check (char_length(industry) <= 100),
  tools text check (char_length(tools) <= 2000),
  message text check (char_length(message) <= 5000),
  source text default 'website'
);

alter table public.leads enable row level security;

-- The public site can insert leads; nobody can read them without the service role
create policy "Website can submit leads"
  on public.leads for insert
  to anon
  with check (true);

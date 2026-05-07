-- ══════════════════════════════════════════════════════════════
-- UNILOOP  –  Database Schema  (idempotent – safe to re-run)
-- Paste the entire file into Supabase → SQL Editor → Run.
-- ══════════════════════════════════════════════════════════════


-- ── 1. SCHOOLS ────────────────────────────────────────────────
create table if not exists public.schools (
  id         uuid        primary key default gen_random_uuid(),
  name       text        not null,
  city       text        not null default 'Bangalore',
  is_active  boolean     not null default true,
  created_at timestamptz not null default now(),

  -- Prevents duplicate rows on repeated seed runs
  constraint schools_name_key unique (name)
);

alter table public.schools enable row level security;

-- Unauthenticated visitors can read active schools so the signup
-- form can populate the dropdown before the user has a session.
do $$ begin
  if not exists (
    select 1 from pg_policies
    where tablename = 'schools' and policyname = 'Schools are publicly readable'
  ) then
    create policy "Schools are publicly readable"
      on public.schools
      for select
      to anon, authenticated
      using (is_active = true);
  end if;
end $$;


-- ── 2. PROFILES ───────────────────────────────────────────────
-- One row per auth.users entry; populated automatically by trigger.
create table if not exists public.profiles (
  id          uuid        primary key references auth.users(id) on delete cascade,
  first_name  text        not null,
  last_name   text        not null,
  phone       text,
  address     text,
  school_id   uuid        references public.schools(id) on delete set null,
  role        text        not null default 'buyer'
                          check (role in ('buyer', 'seller', 'admin')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table public.profiles enable row level security;

do $$ begin
  if not exists (
    select 1 from pg_policies
    where tablename = 'profiles' and policyname = 'Users can read own profile'
  ) then
    create policy "Users can read own profile"
      on public.profiles
      for select
      to authenticated
      using (auth.uid() = id);
  end if;
end $$;

do $$ begin
  if not exists (
    select 1 from pg_policies
    where tablename = 'profiles' and policyname = 'Users can update own profile'
  ) then
    create policy "Users can update own profile"
      on public.profiles
      for update
      to authenticated
      using (auth.uid() = id)
      with check (auth.uid() = id);
  end if;
end $$;


-- ── 3. FUNCTIONS & TRIGGERS ───────────────────────────────────

-- Auto-create a profile row whenever a new user signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, first_name, last_name, phone, address, school_id)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'first_name', ''),
    coalesce(new.raw_user_meta_data ->> 'last_name',  ''),
    nullif(trim(new.raw_user_meta_data ->> 'phone'),   ''),
    nullif(trim(new.raw_user_meta_data ->> 'address'), ''),
    nullif(new.raw_user_meta_data ->> 'school_id',    '')::uuid
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();


-- Keeps profiles.updated_at in sync with every UPDATE.
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists handle_profiles_updated_at on public.profiles;
create trigger handle_profiles_updated_at
  before update on public.profiles
  for each row execute function public.handle_updated_at();


-- ── 4. ROLE GRANTS ────────────────────────────────────────────
-- RLS policies filter rows, but Postgres also requires an explicit
-- GRANT for the role to access the table at all.
grant select            on public.schools  to anon;
grant select            on public.schools  to authenticated;
grant select, update    on public.profiles to authenticated;


-- ── 5. SEED – PARTNERED SCHOOLS ───────────────────────────────
-- ON CONFLICT (name) DO NOTHING makes this safe to re-run.
insert into public.schools (name, city) values
  ('Delhi Public School (Electronic City)',    'Bangalore'),
  ('National Public School (Indiranagar)',     'Bangalore'),
  ('Bishop Cotton Boys'' School',              'Bangalore'),
  ('Greenwood High International School',      'Bangalore'),
  ('Inventure Academy',                        'Bangalore'),
  ('Canadian International School',            'Bangalore'),
  ('Indus International School',               'Bangalore'),
  ('Ryan International School (Bannerghatta)', 'Bangalore'),
  ('St. Joseph''s Indian High School',         'Bangalore'),
  ('The International School Bangalore',       'Bangalore'),
  ('Bangalore International School',           'Bangalore'),
  ('Christ Academy Institute',                 'Bangalore'),
  ('NIFT Bangalore',                           'Bangalore'),
  ('R.V. College of Engineering',              'Bangalore'),
  ('M.S. Ramaiah Institute of Technology',     'Bangalore'),
  ('BMS College of Engineering',               'Bangalore'),
  ('Jyoti Nivas College',                      'Bangalore')
on conflict (name) do nothing;

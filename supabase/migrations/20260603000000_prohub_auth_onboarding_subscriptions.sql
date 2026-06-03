create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  first_name text,
  last_name text,
  phone text,
  role text check (role in ('coach','player','parent','director','staff') or role is null),
  onboarding_complete boolean default false,
  workspace_type text check (workspace_type in ('individual','organization','invite','pisa_player') or workspace_type is null),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text,
  owner_id uuid references auth.users(id) on delete set null,
  stripe_customer_id text,
  subscription_status text,
  subscription_plan text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create table if not exists public.organization_members (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  role text,
  status text default 'pending',
  created_at timestamp with time zone default now(),
  unique (organization_id, user_id)
);

create table if not exists public.players (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete cascade,
  parent_profile_id uuid references public.profiles(id) on delete set null,
  first_name text,
  last_name text,
  birthdate date,
  gender text,
  age_group text,
  position text,
  level text,
  club text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create table if not exists public.teams (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id) on delete cascade,
  name text,
  gender text,
  age_group text,
  competition_level text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  organization_id uuid nullable references public.organizations(id) on delete cascade,
  stripe_customer_id text,
  stripe_subscription_id text unique,
  stripe_price_id text,
  plan_name text,
  status text,
  current_period_end timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create table if not exists public.invites (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id) on delete cascade,
  email text,
  role text,
  token text unique,
  accepted boolean default false,
  expires_at timestamp with time zone,
  created_at timestamp with time zone default now()
);

create trigger profiles_updated_at before update on public.profiles for each row execute function public.set_updated_at();
create trigger organizations_updated_at before update on public.organizations for each row execute function public.set_updated_at();
create trigger players_updated_at before update on public.players for each row execute function public.set_updated_at();
create trigger teams_updated_at before update on public.teams for each row execute function public.set_updated_at();
create trigger subscriptions_updated_at before update on public.subscriptions for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do update set email = excluded.email, updated_at = now();
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.organizations enable row level security;
alter table public.organization_members enable row level security;
alter table public.players enable row level security;
alter table public.teams enable row level security;
alter table public.subscriptions enable row level security;
alter table public.invites enable row level security;

create policy "profiles self read" on public.profiles for select using (auth.uid() = id);
create policy "profiles self update" on public.profiles for update using (auth.uid() = id);
create policy "profiles self insert" on public.profiles for insert with check (auth.uid() = id);

create policy "org members can read orgs" on public.organizations for select using (owner_id = auth.uid() or exists (select 1 from public.organization_members m where m.organization_id = id and m.user_id = auth.uid()));
create policy "users create owned orgs" on public.organizations for insert with check (owner_id = auth.uid());
create policy "owners update orgs" on public.organizations for update using (owner_id = auth.uid());

create policy "members read memberships" on public.organization_members for select using (user_id = auth.uid() or exists (select 1 from public.organizations o where o.id = organization_id and o.owner_id = auth.uid()));
create policy "owners create memberships" on public.organization_members for insert with check (user_id = auth.uid() or exists (select 1 from public.organizations o where o.id = organization_id and o.owner_id = auth.uid()));
create policy "owners update memberships" on public.organization_members for update using (exists (select 1 from public.organizations o where o.id = organization_id and o.owner_id = auth.uid()));

create policy "players related read" on public.players for select using (profile_id = auth.uid() or parent_profile_id = auth.uid());
create policy "players related insert" on public.players for insert with check (profile_id = auth.uid() or parent_profile_id = auth.uid());
create policy "players related update" on public.players for update using (profile_id = auth.uid() or parent_profile_id = auth.uid());

create policy "team org members read" on public.teams for select using (exists (select 1 from public.organization_members m where m.organization_id = organization_id and m.user_id = auth.uid()));
create policy "team org members insert" on public.teams for insert with check (exists (select 1 from public.organization_members m where m.organization_id = organization_id and m.user_id = auth.uid()));

create policy "subscriptions self read" on public.subscriptions for select using (user_id = auth.uid());

create policy "invites org owners read" on public.invites for select using (exists (select 1 from public.organizations o where o.id = organization_id and o.owner_id = auth.uid()));
create policy "invites org owners insert" on public.invites for insert with check (exists (select 1 from public.organizations o where o.id = organization_id and o.owner_id = auth.uid()));

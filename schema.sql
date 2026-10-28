create table public.profiles(id uuid primary key references auth.users on delete cascade,display_name text not null default 'Driver',created_at timestamptz default now());
create table public.sessions(id uuid primary key default gen_random_uuid(),user_id uuid not null references auth.users on delete cascade,mission text not null,score int not null check(score between 0 and 100),counts jsonb not null default '{}',duration_s int,created_at timestamptz default now());
create index on public.sessions(user_id,created_at desc);
alter table public.profiles enable row level security;
alter table public.sessions enable row level security;
create policy "own profile read" on public.profiles for select using (auth.uid()=id);
create policy "own profile write" on public.profiles for insert with check (auth.uid()=id);
create policy "own profile update" on public.profiles for update using (auth.uid()=id) with check (auth.uid()=id);
create policy "own sessions read" on public.sessions for select using (auth.uid()=user_id);
create policy "own sessions insert" on public.sessions for insert with check (auth.uid()=user_id);
create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path=public as $$
begin insert into public.profiles(id,display_name) values(new.id,coalesce(new.raw_user_meta_data->>'name','Driver'));return new;end $$;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

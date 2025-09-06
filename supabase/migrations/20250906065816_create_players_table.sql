create table players (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  profile text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
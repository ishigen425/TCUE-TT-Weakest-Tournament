-- Create votes table
create table votes (
  id uuid default gen_random_uuid() primary key,
  player_id uuid not null references players(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

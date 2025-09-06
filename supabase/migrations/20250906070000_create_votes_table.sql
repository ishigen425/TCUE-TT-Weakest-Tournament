-- Create votes table
create table votes (
  id uuid default gen_random_uuid() primary key,
  player_id uuid not null references players(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ポリシーの作成
--- insertのみ許可
create policy "Allow insert only" on votes
  for insert
  to public
  using (true);

--- 全件取得可能
create policy "Allow select all" on votes
  for select
  to public
  using (true);




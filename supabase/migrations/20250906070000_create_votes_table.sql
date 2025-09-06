-- Create votes table
-- player_idは新しいローマ字ID（kiuchi, wakayama, austin）に対応
create table votes (
  id uuid default gen_random_uuid() primary key,
  player_id varchar(255) not null check (player_id in ('kiuchi', 'wakayama', 'austin')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLSを有効にする
alter table votes enable row level security;

-- ポリシーの作成
-- insertのみ許可
create policy "Allow insert only" on votes
  for insert
  to public
  with check (true);

-- 全件取得可能
create policy "Allow select all" on votes
  for select
  to public
  using (true);




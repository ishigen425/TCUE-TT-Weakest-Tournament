import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 選手一覧を取得
export const getPlayers = async () => {
  const { data, error } = await supabase
    .from('players')
    .select('*')
  if (error) throw error
  return data
}

// 投票を挿入
export const insertVote = async (playerId) => {
  const { data, error } = await supabase
    .from('votes')
    .insert([{ player_id: playerId }])
  if (error) throw error
  return data
}

// 投票数を集計（選手ごとの投票数）
export const getVoteCounts = async () => {
  const { data, error } = await supabase
    .from('votes')
    .select('player_id')
  if (error) throw error

  // 集計
  const counts = {}
  data.forEach(vote => {
    counts[vote.player_id] = (counts[vote.player_id] || 0) + 1
  })
  return counts
}

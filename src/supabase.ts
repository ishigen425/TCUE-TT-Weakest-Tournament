import { createClient } from '@supabase/supabase-js'
import { PlayerId } from './types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 投票を挿入
export const insertVote = async (playerId: PlayerId): Promise<any> => {
  const { data, error } = await supabase
    .from('votes')
    .insert([{ player_id: playerId }])
  if (error) throw error
  return data
}

// 投票数を集計（選手ごとの投票数）
export const getVoteCounts = async (): Promise<Record<string, number>> => {
  const { data, error } = await supabase
    .from('votes')
    .select('player_id')
  if (error) throw error

  // 集計
  const counts: Record<string, number> = {}
  data.forEach((vote: { player_id: string }) => {
    counts[vote.player_id] = (counts[vote.player_id] || 0) + 1
  })
  return counts
}

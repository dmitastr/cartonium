import type { Database } from './database-gameboxes.js'
import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  const client = await serverSupabaseClient<Database>(event)
  const gameboxes = await readBody(event);

  const { data, error } = await client.from('gameboxes').insert(gameboxes).select();
  if (error) {
    throw createError({ statusMessage: error.message })
  }

  return data
})
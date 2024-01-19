import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient(event);
    const query = getQuery(event);
    const userid = query.userid as string;
    if (!userid) {
        return null;
    }

    let profile = await client.from('profiles').select('*')
        .eq('id', userid).single();
    if (profile.error) {
        throw createError({ statusMessage: profile.error.message })
    }

    let clubs = await client.from('profiles_club_rights').select('club_id')
        .eq('profile_id', userid);
    if (clubs.error) {
        throw createError({ statusMessage: clubs.error.message })
    }

    return clubs.data
})
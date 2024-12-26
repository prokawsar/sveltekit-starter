import { signIn } from '$lib/server/auth'
import { redirect, type ServerLoad } from '@sveltejs/kit'
import type { Actions } from './$types'

export const load: ServerLoad = async (event) => {
	const session = await event.locals.auth()
	console.log(session)
	if (session) redirect(301, '/')

	return {
		session,
	}
}

export const actions: Actions = { default: signIn }

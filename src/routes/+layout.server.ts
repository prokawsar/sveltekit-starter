import type { ServerLoad } from '@sveltejs/kit'

export const load: ServerLoad = async (event) => {
	const session = await event.locals.auth()

	return {
		session,
	}
}

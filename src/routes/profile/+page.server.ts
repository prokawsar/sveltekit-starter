import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(302, '/')
	}

	return {
		user: {
			name: locals.user.name,
			email: locals.user.email,
		},
	}
}

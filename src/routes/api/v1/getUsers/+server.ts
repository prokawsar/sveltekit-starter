import { getAllUsers } from '$lib/server/db/queries/select'
import { json } from '@sveltejs/kit'

export const GET = async () => {
	const users = await getAllUsers()
	if (users.length) {
		return json(users)
	}
	return json({})
}

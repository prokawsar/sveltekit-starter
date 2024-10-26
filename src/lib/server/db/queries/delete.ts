import { eq } from 'drizzle-orm'
import { usersTable } from '$lib/server/schema/users'
import type { SelectUser } from '$lib/server/schema/users'
import { db } from '..'

export async function deleteUser(id: SelectUser['id']) {
	await db.delete(usersTable).where(eq(usersTable.id, id))
}

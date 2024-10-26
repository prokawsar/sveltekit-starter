import { db } from '..'
import { usersTable } from '$lib/server/schema/users'
import type { InsertUser } from '$lib/server/schema/users'

export async function createUser(data: InsertUser) {
	await db.insert(usersTable).values(data)
}

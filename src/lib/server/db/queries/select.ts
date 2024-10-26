import { eq } from 'drizzle-orm'
import { usersTable } from '$lib/server/schema/users'
import type { SelectUser } from '$lib/server/schema/users'
import { db } from '..'

export async function getUserById(id: SelectUser['id']): Promise<
	Array<{
		id: number
		name: string
		age: number
		email: string
	}>
> {
	return db.select().from(usersTable).where(eq(usersTable.id, id))
}

export async function getAllUsers(): Promise<Array<SelectUser>> {
	return db.select().from(usersTable)
}

export async function getUserByEmail(email: string) {
	const user = await db.select().from(usersTable).where(eq(usersTable.email, email))
	return user
}

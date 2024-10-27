import { bigint, boolean, pgTable, text } from 'drizzle-orm/pg-core'
import { usersTable } from './users'

export const authKey = pgTable('auth_key', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => usersTable.id, { onDelete: 'cascade' }),
	hashedPassword: text('hashed_password'),
	primaryKey: boolean('primary_key').notNull(),
	expires: bigint('expires', { mode: 'number' }),
})

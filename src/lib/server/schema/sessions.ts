import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { usersTable } from './users'

export const authSession = pgTable('auth_session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => usersTable.id, { onDelete: 'cascade' }),
	expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
})

export type Session = typeof authSession.$inferSelect

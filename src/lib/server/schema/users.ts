import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const usersTable = pgTable('users', {
	id: text('id').primaryKey(), // Changed from serial to text
	name: text('name').notNull(),
	age: integer('age').notNull(),
	email: text('email').notNull().unique(),
	hashedPassword: text('hashed_password').notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at')
		.notNull()
		.$onUpdate(() => new Date()),
})

export type InsertUser = typeof usersTable.$inferInsert
export type SelectUser = typeof usersTable.$inferSelect
export type User = typeof usersTable.$inferSelect

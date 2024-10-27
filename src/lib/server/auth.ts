// src/lib/server/auth.ts
import { Lucia } from 'lucia'
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle'
import { db } from '$lib/server/db' // Your Drizzle instance
import { authSession } from './schema/sessions'
import { usersTable } from './schema/users'

// Define types for Lucia
declare module 'lucia' {
	interface DatabaseUserAttributes {
		email: string
		name: string
	}
	// interface DatabaseSessionAttributes {}
}

const adapter = new DrizzlePostgreSQLAdapter(db, authSession, usersTable)

// Using Drizzle's client for Lucia
export const auth = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: process.env.NODE_ENV === 'production',
		},
	},
	getUserAttributes: (data) => {
		return {
			email: data.email,
			name: data.name,
		}
	},
})

export type Auth = typeof auth

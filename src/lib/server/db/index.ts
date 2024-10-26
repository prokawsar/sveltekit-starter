import { drizzle as neonDrizzle, NeonHttpDatabase } from 'drizzle-orm/neon-http'
import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import { neon } from '@neondatabase/serverless'
import { env } from '$env/dynamic/private'
import { dev } from '$app/environment'
import postgres from 'postgres'

let db: PostgresJsDatabase | NeonHttpDatabase

if (dev) {
	if (!env.DEV_DATABASE_URL) throw new Error('DATABASE_URL is not set')
	const client = postgres(env.DEV_DATABASE_URL)
	db = drizzle(client, {})
} else {
	if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set')
	const client = neon(env.DATABASE_URL)
	db = neonDrizzle(client)
}

export { db }

import { SvelteKitAuth } from '@auth/sveltekit'
// import { DrizzleAdapter } from '@auth/drizzle-adapter'
// import { db } from '$lib/server/db'
// import Credentials from '@auth/core/providers/credentials'
// import bcrypt from 'bcrypt'
// import { getUserByEmail } from '$lib/server/db/queries/select'
import Google from '@auth/sveltekit/providers/google'

export const { handle, signIn, signOut } = SvelteKitAuth({
	// adapter: DrizzleAdapter(db),
	// providers: [
	// 	Credentials({
	// 		credentials: {
	// 			email: {},
	// 			password: {},
	// 		},
	// 		authorize: async (credentials) => {
	// 			const user = getUserByEmail(credentials.email)

	// 			if (!user) return null

	// 			const validPassword = await bcrypt.compare(credentials.password, user.password)

	// 			if (!validPassword) return null

	// 			return {
	// 				id: user.id,
	// 				email: user.email,
	// 				name: user.name,
	// 			}
	// 		},
	// 	}),
	// ],
	providers: [
		Google({
			authorization: {
				params: {
					prompt: 'consent',
					access_type: 'offline',
					response_type: 'code',
				},
			},
		}),
	],
})

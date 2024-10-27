// See https://svelte.dev/docs/kit/types#app

import type { Session } from '$lib/server/schema/sessions'
import type { User } from '$lib/server/schema/users'

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: Partial<User> | null
			session: Session | null
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {}

<!-- <script>
	import { signIn } from '@auth/sveltekit/client'
	import { page } from '$app/stores'

	let email = $state('')
	let password = $state('')
</script>

<div>
	<form>
		<label>
			Email
			<input name="email" type="email" bind:value={email} />
		</label>
		<label>
			Password
			<input name="password" type="password" bind:value={password} />
		</label>
		<button onclick={() => signIn('credentials', { email, password })}> Log in </button>
	</form>
</div> -->

<script lang="ts">
	import { SignIn } from '@auth/sveltekit/components'
</script>

<div class="flex w-full justify-center">
	<span class="flex items-center justify-center rounded-lg border px-5 py-3">
		<SignIn provider="google" signInPage="login/?signIn" />
	</span>
</div>

<script lang="ts">
	import Pure from '$lib/components/Pure.svelte'
	import Snippets from '$lib/components/Snippets.svelte'
	import { typewriter } from '$lib/utils/typewriter'

	let count = $state(0)

	// there’s no need to make it deeply reactive when it will be discarded
	let countSteady = $state.raw(0)

	const computed = $derived(count * 2)
	const messages = [
		'reticulating splines...',
		'generating witty dialog...',
		'swapping time and space...',
	]

	$effect(() => {
		console.log('on mount')

		const interval = setInterval(() => {
			i += 1
			i %= messages.length
		}, 2500)

		return () => {
			clearInterval(interval)
		}
	})

	$inspect(count).with(() => console.log('count', count))

	let i = $state(-1)
</script>

<svelte:head>
	<title>Svelte 5 changes</title>
</svelte:head>

<div
	class="mx-auto flex h-screen max-w-7xl flex-col items-center justify-center gap-2 text-xl font-bold"
>
	<div class="flex flex-row">
		<button class="cursor-pointer border px-10 py-6" onclick={() => count++}>{count}</button>
		<p class="cursor-pointer border px-10 py-6">{computed}</p>
	</div>
	<Pure {...{ min: count, max: computed }} />

	<div class="my-4 flex h-2 items-center">
		{#key i}
			<p class="text-teal-700" in:typewriter={{ speed: 5 }}>
				{messages[i] || ''}
			</p>
		{/key}
	</div>

	<Snippets />
</div>

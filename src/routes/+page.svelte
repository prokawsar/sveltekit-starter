<script lang="ts">
	let count = $state(0)

	const computed = $derived(count * 2)

	$effect(() => {
		console.log('on mount')
	})
</script>

<div class="mx-auto flex h-screen max-w-7xl items-center justify-center text-xl font-bold">
	<button class="cursor-pointer border px-10 py-6" onclick={() => count++}>{count}</button>
	<p class="cursor-pointer border px-10 py-6">{computed}</p>
</div>

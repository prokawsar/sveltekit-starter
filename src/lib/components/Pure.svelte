<script lang="ts">
	type Props = {
		min: number
		max: number
	}

	let { min = 0, max = 999 }: Props = $props()

	let showTooltip = $state(false)

	const onmouseover = () => (showTooltip = true)
</script>

<div class="relative rounded-md border border-purple-800 px-5 py-3">
	<p
		{onmouseover}
		onmouseleave={() => (showTooltip = false)}
		onfocus={() => {}}
		class="font-bold text-green-800"
	>
		{min + max}
	</p>
	<p
		class:hidden={!showTooltip}
		class="absolute left-0 top-10 w-full rounded border border-gray-500 bg-gray-300 px-1 font-light"
	>
		Hover
	</p>
</div>

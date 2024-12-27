<script lang="ts">
	type Props = {
		title?: string;
	};
	let { title = 'Logolabs' }: Props = $props();
</script>

<svelte:head>
	<title>{title} | Logolabs.io</title>
</svelte:head>

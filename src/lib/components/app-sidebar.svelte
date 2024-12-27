<script lang="ts" module>
	import House from 'lucide-svelte/icons/house';
	import Inbox from 'lucide-svelte/icons/inbox';
	import Search from 'lucide-svelte/icons/search';
	import Settings from 'lucide-svelte/icons/settings';

	const data = {
		navMain: [
			{
				title: 'Home',
				url: '/dashboard',
				icon: House
			},
			{
				title: 'Orders',
				url: '/dashboard/orders',
				icon: Inbox
			},
			{
				title: 'Search',
				url: '/dashboard/results',
				icon: Search
			},
			{
				title: 'Settings',
				url: '/dashboard/settings',
				icon: Settings
			}
		]
	};
</script>

<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import type { User } from '@supabase/supabase-js';
	import { getContext, type ComponentProps } from 'svelte';
	import NavMain from './nav-main.svelte';
	import NavUser from './nav-user.svelte';

	let {
		ref = $bindable(null),
		collapsible = 'icon',
		...restProps
	}: ComponentProps<typeof Sidebar.Root> = $props();

	const user = getContext('user') as User;
</script>

<Sidebar.Root bind:ref {collapsible} {...restProps}>
	<Sidebar.Header>
		<Sidebar.MenuButton
			isActive
			size="lg"
			class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
		>
			<div
				class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
			>
				<!-- <activeTeam.logo class="size-4" /> -->
			</div>
			<div class="grid flex-1 text-left text-sm leading-tight">
				<span class="truncate font-semibold"> Logolabs </span>
				<span class="truncate text-xs">Make logo with AI</span>
			</div>
			<!-- <ChevronsUpDown class="ml-auto" /> -->
		</Sidebar.MenuButton>
	</Sidebar.Header>
	<Sidebar.Content>
		<NavMain items={data.navMain} />
	</Sidebar.Content>
	<Sidebar.Footer>
		<NavUser {user} />
	</Sidebar.Footer>
	<Sidebar.Rail />
</Sidebar.Root>

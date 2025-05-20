<script lang="ts">
	import type { PageProps } from "./$types";
	import { EventCard, CreateEventModal } from "$lib/components";

	let { data }: PageProps = $props();
</script>

<main>
	<CreateEventModal />
	<div class="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 lg:grid-cols-3">
		{#each data.events as event}
			<EventCard {event} />
		{/each}
	</div>
</main>

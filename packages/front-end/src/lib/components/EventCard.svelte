<script lang="ts">
	import { Card } from "flowbite-svelte";
	import type { Event } from "@dartsFlow/db";
	import dayjs from "dayjs";

	export let event: Event;
</script>

<div class="space-y-4">
	<Card img="" href="/" horizontal size="xl">
		<div class="m-6">
			<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
				{event.name}
			</h5>
			<div class="mb-3 leading-tight font-normal text-gray-700 dark:text-gray-400">
				<p>
					du {dayjs(event.startDate).format("DD/MM/YYYY")} au {dayjs(event.endDate).format(
						"DD/MM/YYYY"
					)}
				</p>
				<p>A {event.location}</p>
			</div>
		</div>
	</Card>
</div>

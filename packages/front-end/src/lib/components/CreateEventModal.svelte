<script lang="ts">
	import { Button, Modal, Label, Input } from "flowbite-svelte";
	let formModal = $state(false);

	const handleSubmit = async (
		event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }
	) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const obj = Object.fromEntries(data.entries());
		console.log("JTA", obj);
	};
</script>

<Button onclick={() => (formModal = true)}>Créer un évènement</Button>

<Modal bind:open={formModal} size="xs">
	<form class="flex flex-col space-y-6" onsubmit={handleSubmit}>
		<h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Evènement</h3>
		<Label class="space-y-2">
			<span>Nom</span>
			<Input type="text" name="name" placeholder="Coupe de france 2025" required />
		</Label>
		<Label class="space-y-2">
			<span>Localisation</span>
			<Input type="text" name="location" placeholder="Nantes" required />
		</Label>
		<Label class="space-y-2">
			<span>Description</span>
			<Input type="text" name="description" placeholder="..." required />
		</Label>
		<Label class="space-y-2">
			<span>Date de début</span>
			<Input type="date" name="startDate" required />
		</Label>
		<Label class="space-y-2">
			<span>Date de fin</span>
			<Input type="date" name="endDate" required />
		</Label>
		<Button color="primary" type="submit" class="w-full1">Valider</Button>
	</form>
</Modal>

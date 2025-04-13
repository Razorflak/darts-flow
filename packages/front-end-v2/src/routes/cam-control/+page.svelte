<script lang="ts">
	const defaultIps = [
		"192.168.1.51",
		"192.168.1.21",
		"192.168.1.62",
		"192.168.1.70",
		"192.168.1.57"
	];
	let ipList: string[] = $state([]);
	let text: string = $state(defaultIps.join("\n"));

	function valider() {
		// Découpe le texte en lignes par les retours à la ligne
		ipList = text
			.split("\n")
			.map((ligne) => ligne.trim())
			.filter((ligne) => ligne !== "");
	}
</script>

<main class="flex flex-col">
	<textarea
		bind:value={text}
		rows="10"
		cols="30"
		class="w-1/2 rounded-xl border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
		placeholder="Écris une ligne par élément..."
	></textarea>
	<button
		onclick={valider}
		class="mt-4 w-1/6 rounded-xl bg-blue-600 px-5 py-2 font-semibold text-white transition-colors duration-200 hover:bg-blue-700"
		>Valider</button
	>

	<div>
		{#each ipList as ip}
			<iframe title={ip} src="http://{ip}:4747" class="w-1/2"></iframe>
		{/each}
	</div>
</main>

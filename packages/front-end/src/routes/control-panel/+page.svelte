<script lang="ts">
	import type { Client } from "@dartsFlow/shared-ws";
	import ClientList from "./ClientList.svelte";
	import CreateGame from "./CreateGame.svelte";
	import MatchList from "./MatchList.svelte";
	let selectedClient: Client | null = $state(null);
</script>

<CreateGame />
<ClientList bind:selectedClient />
<MatchList client={selectedClient} />

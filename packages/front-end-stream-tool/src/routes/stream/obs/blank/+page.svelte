<svelte:head>
	<title>Blank — Overlay</title>
</svelte:head>

<div class="broadcast-page">
	<main class="broadcast-frame" aria-label="Écran vert vide"></main>
</div>

<style>
	:global(html),
	:global(body) {
		margin: 0;
		overflow: hidden;
		background: #ff0000;
	}

	:global(body) {
		min-width: 100vw;
		min-height: 100vh;
	}

	.broadcast-page {
		position: fixed;
		inset: 0;
		display: grid;
		place-items: center;
		background: #ff0000;
	}

	.broadcast-frame {
		width: min(100vw, calc(100vh * 16 / 9));
		height: min(100vh, calc(100vw * 9 / 16));
		background: #00ff00;
	}
</style>

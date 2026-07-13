<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/state";
	import { onMount } from "svelte";
	import playerData from "./players.json";

	type Player = (typeof playerData.players)[number];

	const defaultPlayer = playerData.players[0];

	const selectedPlayer: Player = $derived.by(() => {
		const requestedSlug = page.url.searchParams.get("player");

		return playerData.players.find(({ slug }) => slug === requestedSlug) ?? defaultPlayer;
	});

	const age = $derived(getAge(selectedPlayer.birthDate));
	let loadedPlayerSlug: string | null = $state(null);
	let isLeaving = $state(false);
	let loadGeneration = 0;
	let navigationTarget: string | null = null;
	let navigationTimeout: ReturnType<typeof setTimeout> | null = null;
	const isReady = $derived(loadedPlayerSlug === selectedPlayer.slug);

	$effect(() => {
		const player = selectedPlayer;
		const generation = ++loadGeneration;
		isLeaving = false;

		void preloadPlayerPresentation(player).then(() => {
			if (generation === loadGeneration) {
				loadedPlayerSlug = player.slug;
			}
		});
	});

	onMount(() => {
		const handleOverlayNavigation = (event: Event) => {
			const navigationEvent = event as CustomEvent<{ path: string }>;
			navigationEvent.preventDefault();
			navigationTarget = navigationEvent.detail.path;

			if (isLeaving) return;

			isLeaving = true;
			navigationTimeout = setTimeout(async () => {
				const target = navigationTarget;
				if (!target) return;

				const currentPath = `${page.url.pathname}${page.url.search}`;
				await goto(target);

				if (target === currentPath) {
					isLeaving = false;
				}
			}, 280);
		};

		window.addEventListener("overlay:navigate", handleOverlayNavigation);

		return () => {
			window.removeEventListener("overlay:navigate", handleOverlayNavigation);
			if (navigationTimeout) clearTimeout(navigationTimeout);
		};
	});

	async function preloadPlayerPresentation(player: Player) {
		if (typeof window === "undefined") return;

		await Promise.all([
			preloadImage(player.portrait),
			preloadImage(player.flag),
			preloadImage("/img/winamax_logo.png"),
			preloadImage("/img/footer_banner.png"),
			document.fonts?.load('1em "Lexend"')
		]);

		await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
	}

	async function preloadImage(source: string) {
		const image = new Image();
		image.src = source;

		try {
			await image.decode();
		} catch {
			await new Promise<void>((resolve) => {
				if (image.complete) {
					resolve();
					return;
				}

				image.onload = () => resolve();
				image.onerror = () => resolve();
			});
		}
	}

	function getAge(birthDate: string) {
		const today = new Date();
		const birth = new Date(`${birthDate}T00:00:00`);
		let years = today.getFullYear() - birth.getFullYear();
		const birthdayHasPassed =
			today.getMonth() > birth.getMonth() ||
			(today.getMonth() === birth.getMonth() && today.getDate() >= birth.getDate());

		if (!birthdayHasPassed) {
			years -= 1;
		}

		return years;
	}

	function formatDate(date: string) {
		return new Intl.DateTimeFormat("fr-FR", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric"
		}).format(new Date(`${date}T00:00:00`));
	}
</script>

<svelte:head>
	<title>{selectedPlayer.name} — Présentation joueur</title>
</svelte:head>

<div class="broadcast-page">
	<main class="broadcast-frame" aria-label="Présentation de {selectedPlayer.name}">
		{#if isReady}
			<div class="portrait-frame" aria-hidden="true">
				<div class="portrait-accent"></div>
				<img class="portrait" src={selectedPlayer.portrait} alt="" />
			</div>

			<section class:leaving={isLeaving} class="player-card">
				<header class="player-header">
					<div class="identity">
						<p class="eyebrow">{selectedPlayer.nickname}</p>
						<div class="name-line">
							<h1>{selectedPlayer.name}</h1>
							<img
								class="flag"
								src={selectedPlayer.flag}
								alt="Drapeau : {selectedPlayer.country}"
							/>
						</div>
					</div>
					<img class="winamax-logo" src="/img/winamax_logo.png" alt="Winamax" />
				</header>

				<div class="player-details">
					<div class="details-pair">
						<div class="detail-block">
							<p class="detail-label">Âge</p>
							<p class="detail-value detail-value-large">{age} ans</p>
						</div>
						<div class="detail-block ranking-block">
							<p class="detail-label">Classement PDC</p>
							<p class="detail-value ranking"><span>N°</span>{selectedPlayer.pdcRanking}</p>
						</div>
					</div>

					<div class="detail-block detail-row">
						<p class="detail-label">Origines</p>
						<p class="detail-value">{selectedPlayer.origin}</p>
					</div>

					<div class="detail-block detail-row">
						<p class="detail-label">Fléchettes</p>
						<p class="detail-value">{selectedPlayer.darts}</p>
					</div>

					<div class="honours">
						<p class="detail-label">Palmarès</p>
						<ul>
							{#each selectedPlayer.honours as honour}
								<li>{honour}</li>
							{/each}
						</ul>
					</div>
				</div>

				<footer class="sponsor-footer">
					<img src="/img/footer_banner.png" alt="Winamax French Darts Festival" />
				</footer>
			</section>
		{/if}
	</main>
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
		position: relative;
		width: min(100vw, calc(100vh * 16 / 9));
		height: min(100vh, calc(100vw * 9 / 16));
		overflow: hidden;
		container-type: size;
		font-family: "Lexend", sans-serif;
		color: white;
		background: #00ff00;
	}

	.portrait-frame {
		position: absolute;
		inset: 0 auto 0 0;
		width: 52%;
		overflow: hidden;
	}

	.portrait-accent {
		position: absolute;
		left: -18%;
		bottom: -22%;
		width: 78%;
		aspect-ratio: 1;
		border: 1.1cqw solid rgb(72 0 72 / 78%);
		border-radius: 50%;
		box-shadow: 0 0 5cqw rgb(72 0 72 / 65%);
	}

	.portrait {
		position: absolute;
		left: -38%;
		bottom: 0;
		width: 175%;
		height: 100%;
		max-width: none;
		object-fit: contain;
		object-position: center bottom;
		filter: drop-shadow(1.2cqw 0.7cqw 0.9cqw rgb(0 0 0 / 55%));
	}

	.player-card {
		position: absolute;
		top: 3.7%;
		right: 2.7%;
		bottom: 3.7%;
		width: 51.2%;
		display: grid;
		grid-template-rows: 22% 1fr 12%;
		overflow: hidden;
		border-top: 0.35cqw solid rgb(255 255 255 / 18%);
		background: #480048;
		box-shadow: 0 0.8cqw 2.5cqw rgb(0 0 0 / 55%);
		animation: player-card-slide-in 300ms ease-in-out both;
	}

	.player-card.leaving {
		animation: player-card-slide-out 280ms ease-in-out both;
	}

	@keyframes player-card-slide-in {
		from {
			transform: translateX(110%);
			opacity: 0;
		}
		to {
			transform: translateX(0);
			opacity: 1;
		}
	}

	@keyframes player-card-slide-out {
		from {
			transform: translateX(0);
			opacity: 1;
		}
		to {
			transform: translateX(110%);
			opacity: 0;
		}
	}

	.player-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1.4cqw;
		padding: 1.25cqw 1.6cqw 1.1cqw 2cqw;
		border-bottom: 0.08cqw solid rgb(255 255 255 / 35%);
		background: linear-gradient(110deg, #5c005c 0%, #480048 68%, #270027 100%);
	}

	.identity {
		min-width: 0;
	}

	.eyebrow,
	.detail-label {
		margin: 0;
		text-transform: uppercase;
		letter-spacing: 0.13em;
	}

	.eyebrow {
		margin-bottom: 0.22cqw;
		font-size: 1.05cqw;
		font-weight: 600;
		color: #ff2438;
	}

	.name-line {
		display: flex;
		align-items: center;
		gap: 0.85cqw;
	}

	h1 {
		margin: 0;
		font-size: clamp(2rem, 3.15cqw, 4.1rem);
		line-height: 0.98;
		font-weight: 800;
		letter-spacing: -0.045em;
		text-transform: uppercase;
	}

	.flag {
		width: 3.3cqw;
		min-width: 3.3cqw;
		aspect-ratio: 5 / 3;
		object-fit: cover;
		border: 0.12cqw solid white;
		box-shadow: 0 0.2cqw 0.5cqw rgb(0 0 0 / 45%);
	}

	.winamax-logo {
		width: 5.6cqw;
		height: 5.2cqh;
		object-fit: contain;
		flex: none;
	}

	.player-details {
		display: grid;
		grid-template-rows: 27% 17% 17% 1fr;
		min-height: 0;
	}

	.details-pair {
		display: grid;
		grid-template-columns: 1fr 1.08fr;
		border-bottom: 0.08cqw solid rgb(255 255 255 / 24%);
	}

	.detail-block {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 0.65cqw 2cqw;
	}

	.details-pair .detail-block:first-child {
		border-right: 0.08cqw solid rgb(255 255 255 / 24%);
	}

	.detail-row {
		display: grid;
		grid-template-columns: 30% 1fr;
		align-items: center;
		border-bottom: 0.08cqw solid rgb(255 255 255 / 24%);
	}

	.detail-label {
		font-size: 0.82cqw;
		font-weight: 600;
		color: rgb(255 255 255 / 62%);
	}

	.detail-value {
		margin: 0.2cqw 0 0;
		font-size: 1.32cqw;
		line-height: 1.12;
		font-weight: 700;
	}

	.detail-value-large {
		font-size: 2.35cqw;
	}

	.ranking-block {
		position: relative;
		background: rgb(0 0 0 / 15%);
	}

	.ranking {
		font-size: 2.6cqw;
		line-height: 1;
		color: #ff2438;
	}

	.ranking span {
		margin-right: 0.2cqw;
		font-size: 1.2cqw;
		color: white;
	}

	.honours {
		min-height: 0;
		padding: 0.75cqw 2cqw 0.55cqw;
		background: linear-gradient(90deg, rgb(0 0 0 / 28%), transparent);
	}

	.honours ul {
		margin: 0.38cqw 0 0;
		padding: 0;
		list-style: none;
	}

	.honours li {
		position: relative;
		padding-left: 1cqw;
		font-size: 0.94cqw;
		line-height: 1.42;
		font-weight: 600;
	}

	.honours li::before {
		position: absolute;
		left: 0;
		color: #ff2438;
		content: "◆";
		font-size: 0.48cqw;
		transform: translateY(0.2cqw);
	}

	.sponsor-footer {
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: center;
		gap: 0.9cqw;
		padding: 0.55cqw 1.25cqw;
		background: #050505;
	}

	.sponsor-footer img {
		width: 100%;
		max-height: 5.8cqh;
		object-fit: contain;
		object-position: left center;
	}

	@font-face {
		font-family: "Lexend";
		src: url("/fonts/Lexend-Medium.ttf") format("truetype");
		font-weight: 500;
		font-style: normal;
	}

	@font-face {
		font-family: "Lexend";
		src: url("/fonts/Lexend-Bold.ttf") format("truetype");
		font-weight: 700 800;
		font-style: normal;
	}
</style>

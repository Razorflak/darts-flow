<script lang="ts">
	import { getTeamDisplayName, type Leg, type Match, type Team } from "@dartsScorer/models";

	const { leg, match, mancheNumber }: { leg: Leg; match: Match; mancheNumber: number } = $props();

	const getTeamLegDatas = (leg: Leg, teamId: string) => {
		const throws = leg.throws.filter((t) => t.teamId === teamId);
		const dartsCount = leg.throws.reduce((acc, cur) => {
			if (cur.teamId === teamId) {
				return acc + cur.darts;
			}
			return acc;
		}, 0);

		const totalScore = leg.throws.reduce((acc, cur) => {
			if (cur.teamId === teamId) {
				return acc + cur.score;
			}
			return acc;
		}, 0);
		return {
			throws,
			average: isNaN((totalScore / dartsCount) * 3) ? 0 : (totalScore / dartsCount) * 3,
			dartsCount,
			teamId,
			team: match.teams.find((t) => t.id === teamId) as Team
		};
	};

	const t1Data = $derived(getTeamLegDatas(leg, match.teams[0].id));
	const t2Data = $derived(getTeamLegDatas(leg, match.teams[1].id));

	const datas = $derived([t1Data, t2Data]);
	const legIndex = $derived(match.sets[0].legs.findIndex((l) => l.id === leg.id));
</script>

<div class="m-8 overflow-hidden rounded-2xl border border-white bg-blue-950 text-white">
	<div class="w-full border-b text-center">Manche {mancheNumber}</div>
	<div class="flex h-full w-full flex-row">
		{#each datas as data, index}
			<div class="flex flex-row {index === 0 ? 'border-r' : ''} text-center">
				<div class="flex w-full flex-col">
					<div class="flex w-full items-center justify-center border-b p-2 align-middle font-bold">
						<div
							class="relative left-2 mx-4 h-4 w-4 rounded-full bg-red-500 {data.teamId ===
							leg.startingTeamId
								? 'visible'
								: 'invisible'}"
						></div>
						<span class="inline-flex items-center text-xl">{getTeamDisplayName(data.team)}</span>
						<div
							class="relative right-2 mx-4 {data.teamId === leg.winningTeamId
								? 'visible'
								: 'invisible'}"
						>
							👑
						</div>
					</div>
					<div class="flex w-full flex-row">
						<div class="flex flex-col justify-center border-r px-8 py-4 align-middle">
							<span class="w-full"> Moy.</span>
							<span class="flex min-w-full text-2xl font-bold">{data.average.toFixed(2)}</span>
						</div>
						<div class="flex flex-col justify-center px-8 py-4 text-center">
							<span>Darts</span>
							<span class="text-2xl font-bold">{data.dartsCount}</span>
						</div>
					</div>
					<div class="flex flex-col border-t pb-1 text-center">
						{#each data.throws as throw_, index}
							<span
								class="p-0.5 font-bold {index === data.throws.length - 1 &&
								data.teamId === leg.winningTeamId
									? 'text-2xl underline'
									: ''}"
							>
								{throw_.score}</span
							>
						{/each}
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>

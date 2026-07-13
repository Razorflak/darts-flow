export const blankOverlayRoute = {
	label: "BLANK",
	path: "/stream/obs/blank"
} as const;

export const playerPresentationRoutes = [
	{
		label: "Thibault Tricole",
		path: "/stream/obs/player-presentation?player=thibault-tricole"
	},
	{
		label: "Michael Smith",
		path: "/stream/obs/player-presentation?player=michael-smith"
	},
	{
		label: "Peter Wright",
		path: "/stream/obs/player-presentation?player=peter-wright"
	},
	{
		label: "Kim Huybrechts",
		path: "/stream/obs/player-presentation?player=kim-huybrechts"
	}
] as const;

export const overlayRoutes = [
	{ label: "Score Green", path: "/stream/obs/score-green" },
	{ label: "Stat WFDF", path: "/stream/obs/stat-wfdf" },
	{ label: "Versus Green", path: "/stream/obs/versus-green" }
] as const;

const allowedOverlayRoutes = new Set<string>([
	blankOverlayRoute.path,
	...playerPresentationRoutes.map(({ path }) => path),
	...overlayRoutes.map(({ path }) => path)
]);

export const isAllowedOverlayRoute = (path: string) => allowedOverlayRoutes.has(path);

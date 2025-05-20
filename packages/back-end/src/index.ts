import express from "express"
import expressWs from "express-ws"
import apiMatchRouter from "./api/match/match.js"
import apiMatchArchiveRouter from "./api/match/match-archive.js"
import { addWsToStore } from "./lib/action/ws-store.js"
import { ensureMatchFoldersExistSync } from "./lib/action/index.js"
import { createDynamicRouter } from "./api/router/generic-router.js"
import {
	EventUncheckedCreateInputSchema,
	EventUncheckedUpdateInputSchema,
	PhaseUncheckedCreateInputSchema,
	PhaseUncheckedUpdateInputSchema,
	prisma,
	RoundTeamUncheckedCreateInputSchema,
	RoundTeamUncheckedUpdateInputSchema,
	RoundUncheckedCreateInputSchema,
	RoundUncheckedUpdateInputSchema,
	TeamTournamentUncheckedCreateInputSchema,
	TeamTournamentUncheckedUpdateInputSchema,
	TournamentUncheckedCreateInputSchema,
	TournamentUncheckedUpdateInputSchema,
} from "@dartsFlow/db"
import { logger } from "@dartsFlow/opentelemetry"

export const { app } = expressWs(express())

const port = 3000
ensureMatchFoldersExistSync()
logger.info("app stated")

// historique stream
app.use("/api/match", apiMatchRouter)
app.use("/api/match-archive", apiMatchArchiveRouter)
//

app.use(
	"/api/events",
	createDynamicRouter(prisma.event, "event", {
		updateSchema: EventUncheckedUpdateInputSchema,
		createSchema: EventUncheckedCreateInputSchema,
	}),
)

app.use(
	"/api/tournaments",
	createDynamicRouter(prisma.tournament, "tournament", {
		updateSchema: TournamentUncheckedUpdateInputSchema,
		createSchema: TournamentUncheckedCreateInputSchema,
	}),
)
app.use(
	"/api/phases",
	createDynamicRouter(prisma.phase, "phase", {
		createSchema: PhaseUncheckedCreateInputSchema,
		updateSchema: PhaseUncheckedUpdateInputSchema,
	}),
)
app.use(
	"/api/rounds",
	createDynamicRouter(prisma.round, "round", {
		createSchema: RoundUncheckedCreateInputSchema,
		updateSchema: RoundUncheckedUpdateInputSchema,
	}),
)
app.use(
	"/api/team-tournaments",
	createDynamicRouter(prisma.teamTournament, "teamTournament", {
		createSchema: TeamTournamentUncheckedCreateInputSchema,
		updateSchema: TeamTournamentUncheckedUpdateInputSchema,
	}),
)
app.use(
	"/api/round-teams",
	createDynamicRouter(prisma.roundTeam, "roundTeam", {
		createSchema: RoundTeamUncheckedCreateInputSchema,
		updateSchema: RoundTeamUncheckedUpdateInputSchema,
	}),
)

app.ws("/api/ws", (ws, req, next) => {
	const queryParams = req.query
	const screen = queryParams.screen
	if (!screen) {
		next(new Error("Need to set 'screen' in the query params"))
	}
	console.log(`ouverture du websocket depuis: ${req.ip}`)
	addWsToStore(ws, req.ip || "unknow ip", screen as string)
})

app.listen(port, "0.0.0.0", () => {
	console.log(`Serveur en écoute sur http://localhost:${port}`)
})

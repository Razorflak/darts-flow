import express from "express"
import expressWs from "express-ws"
import apiMatchRouter from "./api/match/match.js"
import apiMatchArchiveRouter from "./api/match/match-archive.js"
import { addWsToStore } from "./lib/action/ws-store.js"
import { ensureMatchFoldersExistSync } from "./lib/action/index.js"

const { app } = expressWs(express())

const port = 3000
ensureMatchFoldersExistSync()

app.use("/api/match", apiMatchRouter)
app.use("/api/match-archive", apiMatchArchiveRouter)
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

import express from "express"
import expressWs from "express-ws"
import apiMatchRouter from "./api/match.js"
import { addWsToStore, addWsMessageListerner } from "@dartsScorer/ws"

const { app } = expressWs(express())

const port = 3000

app.use("/api/match", apiMatchRouter)
app.ws("/api/ws", (ws, req, next) => {
	console.log(`ouverture du websocket depuis: ${req.ip}`)
	addWsToStore(ws, req.ip || "unknow ip")
	addWsMessageListerner(ws)
})

app.listen(port, "0.0.0.0", () => {
	console.log(`Serveur en écoute sur http://localhost:${port}`)
})

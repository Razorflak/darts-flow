import express from "express"
import type { Request, Response } from "express"
import expressWs from "express-ws"
import apiRouter from "./api/match.js"

const { app, getWss, applyTo } = expressWs(express())

const port = 3000

app.use("/api", apiRouter)
app.ws("/", (ws, req, next) => {
	ws.on("open", () => {
		console.log(`ouverture du websocket depuis: ${req.ip}`)
	})

	ws.on("message", (data) => {
		console.log("ws input", data)
	})
})

app.listen(port, "0.0.0.0", () => {
	console.log(`Serveur en écoute sur http://localhost:${port}`)
})

import { describe, it, expect, beforeAll, afterAll } from "vitest"
import supertest from "supertest"
import { app } from "../index.js"
import { type Event, prisma } from "@dartsFlow/db"

const request = supertest(app)

describe("Event Routes", () => {
	let createdEvent: Event
	beforeAll(async () => {
		await prisma.event.deleteMany()
	})

	afterAll(async () => {
		// Déconnecter Prisma après tous les tests
		if (createdEvent) {
			await prisma.event.delete({ where: { id: createdEvent.id } })
		}
		await prisma.$disconnect()
	})

	it("should get all events", async () => {
		const response = await request.get("/api/event")
		expect(response.status).toBe(200)
		expect(response.body).toBeInstanceOf(Array)
	})

	it("should create a new event", async () => {
		const newEventData = {
			name: "Test Event",
			startDate: "2025-05-10T10:00:00.000Z",
			endDate: "2025-05-12T18:00:00.000Z",
		}
		const response = await request.post("/api/event").send(newEventData)
		expect(response.status).toBe(201)
		expect(response.body).toHaveProperty("id")
		expect(response.body.name).toBe(newEventData.name)
		createdEvent = response.body // Sauvegarder l'événement créé pour les tests suivants
	})

	it("should get an event by ID", async () => {
		const response = await request.get(`/api/event/${createdEvent.id}`)
		expect(response.status).toBe(200)
		expect(response.body).toHaveProperty("id", createdEvent.id)
		expect(response.body.name).toBe(createdEvent.name)
	})

	it("should update an event by ID", async () => {
		const updatedEventData = {
			name: "Updated Test Event",
			location: "Updated Location",
		}
		const response = await request
			.put(`/api/event/${createdEvent.id}`)
			.send(updatedEventData)
		expect(response.status).toBe(200)
		expect(response.body).toHaveProperty("id", createdEvent.id)
		expect(response.body.name).toBe(updatedEventData.name)
		expect(response.body.location).toBe(updatedEventData.location)
	})

	it("should delete an event by ID", async () => {
		const response = await request.delete(`/api/event/${createdEvent.id}`)
		expect(response.status).toBe(204)

		// Vérifier que l'événement a bien été supprimé
		const getResponse = await request.get(`/api/event/${createdEvent.id}`)
		expect(getResponse.status).toBe(404)
	})

	it("should return 404 for a non-existent event ID", async () => {
		const response = await request.get("/api/event/non-existent-id")
		expect(response.status).toBe(404)
		expect(response.body).toHaveProperty("error")
	})
})

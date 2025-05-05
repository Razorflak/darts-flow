import { PrismaClient } from "@prisma/client";
import { describe, it } from "vitest";

const prisma = new PrismaClient();

describe("toto", () => {
  it("should console", async () => {
    console.log("coucou");
    await prisma.player.create({ data: { name: "team1", id: "dlqsfjqsmj" } });
    const toto = await prisma.player.findFirst();

    console.log("get", toto);
  });
});

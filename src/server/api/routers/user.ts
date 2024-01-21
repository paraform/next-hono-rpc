import { Hono } from "hono";
import { db } from "@/server/db";

async function getUsers() {
  return await db.query.users.findMany();
}

export const userRouter = new Hono()
  .get("/", async (c) => {
    try {
      const users = await getUsers();
      return c.json([...users]);
    } catch {
      (err: Error) => c.json({ error: err }, 400);
    }
  })
  .post("/", (c) => c.json({ result: "create a user" }, 201))
  .get("/:id", (c) => c.json({ result: `get ${c.req.param("id")}` }));

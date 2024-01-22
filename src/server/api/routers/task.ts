import { context } from "../context";

export const taskRouter = context
  .get("/", async (c) => {
    try {
      const tasks = await c.get("database").query.tasks.findMany({
        where: (tasks, { eq }) => eq(tasks.createdById, c.get("userId")),
      });

      return c.json(tasks);
    } catch {
      (err: Error) => c.json({ error: err }, 400);
    }
  })
  .post("/", (c) => c.json({ result: "create a task" }, 201))
  .get("/:id", (c) => c.json({ result: `get ${c.req.param("id")}` }));

import { db } from "@/server/db";
import { context } from "../context";

export const taskRouter = context
  .get("/", async (c) => {
    try {
      //   const userId = c.get("userId");
      //   if (!userId) {
      //     throw new Error("User not found");
      //   }

      const tasks = db.query.tasks.findMany({
        where: (tasks, { eq }) =>
          eq(tasks.createdById, "dfaea926-0a34-4463-bf45-1fd3f6cdeeb7"),
      });

      return c.json(tasks);
    } catch {
      (err: Error) => c.json({ error: err }, 400);
    }
  })
  .post("/", (c) => c.json({ result: "create a task" }, 201))
  .get("/:id", (c) => c.json({ result: `get ${c.req.param("id")}` }));

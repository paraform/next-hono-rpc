import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const schema = z.object({
  name: z.string(),
});

export const helloRouter = new Hono()
  .get("/", (c) => c.json({ result: "Hello World!" }))
  .post("/", zValidator("form", schema), (c) =>
    c.json({ message: `Hello ${c.req.valid("form").name}!` }, 201)
  )
  .get("/:id", (c) => c.json({ result: `get ${c.req.param("id")}` }));

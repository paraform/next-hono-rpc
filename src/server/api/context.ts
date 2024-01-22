import { Hono } from "hono";
import { db } from "../db";
import { auth } from "../auth";

type Variables = {
  userId: string;
  database: typeof db;
};

export const context = new Hono<{ Variables: Variables }>()
  .use("*", async (c, next) => {
    c.set("database", db);
    await next();
  })
  .use("*", async (c, next) => {
    const session = await auth();
    if (session && session.user) {
      c.set("userId", session?.user?.id);
    }

    await next();
  });

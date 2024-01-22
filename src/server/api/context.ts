import { type MiddlewareHandler } from "hono";
import { HTTPException } from "hono/http-exception";
import { auth } from "../auth";

export function cookieAuth(): MiddlewareHandler {
  return async (c, next) => {
    const session = await auth();

    if (!session && !session?.user) {
      throw new HTTPException(401, { message: "No user found" });
    }

    try {
      const userId = session.user.id;
      c.set("userId", userId);
      await next();
    } catch (error) {
      throw new HTTPException(403, { message: "No user found" });
    }
  };
}
// import { Hono } from "hono";
// import { db } from "../db";
// import { auth } from "../auth";

// type Variables = {
//   userId: string;
//   database: typeof db;
// };

// export const context = new Hono<{ Variables: Variables }>()
//   .use("*", async (c, next) => {
//     c.set("database", db);
//     await next();
//   })
//   .use("*", async (c, next) => {
//     const session = await auth();
//     if (session && session.user) {
//       c.set("userId", session?.user.id);
//     }
//     await next();
//   });

import { Hono } from "hono";
import { helloRouter } from "./routers/hello";
import { userRouter } from "./routers/user";

export const app = new Hono()
  .basePath("/api")
  .route("/hello", helloRouter)
  .route("/user", userRouter);

export type AppType = typeof app;

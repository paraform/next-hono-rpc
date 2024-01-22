import { Hono } from "hono";
import { helloRouter } from "./routers/hello";
import { userRouter } from "./routers/user";
import { taskRouter } from "./routers/task";

export const app = new Hono()
  .basePath("/api")
  .route("/hello", helloRouter)
  .route("/user", userRouter)
  .route("/task", taskRouter);

export type AppType = typeof app;

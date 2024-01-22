import { userRouter } from "./routers/user";
import { taskRouter } from "./routers/task";
import { context } from "./context";

export const app = context
  .basePath("/api")
  .route("/user", userRouter)
  .route("/task", taskRouter);

export type AppType = typeof app;

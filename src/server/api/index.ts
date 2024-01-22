import { userRouter } from "./routers/user";
import { taskRouter } from "./routers/task";
import { context } from "./context";

export type GlobalErrorResponse = {
  error: {
    message: Error["message"];
    status: number;
  };
};

export const app = context
  .basePath("/api")
  .route("/user", userRouter)
  .route("/task", taskRouter)
  .onError(async (err, c) => {
    return c.json<GlobalErrorResponse>({
      error: {
        message: err.message,
        status: 500,
      },
    });
  })
  .notFound(async (c) => {
    return c.text(
      `Oops! There is nothing here! 404 Not Found.                                                                          `,
    );
  });

export type AppType = typeof app;

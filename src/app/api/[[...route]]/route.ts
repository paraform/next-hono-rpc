import { app } from "@/server/api";
import { handle } from "hono/vercel";

export const GET = handle(app);
export const POST = handle(app);

// export type GlobalErrorResponse = {
//   error: {
//     message: Error;
//     status: number;
//   };
// };

// app.onError(async (err, c) => {
//   return c.json<GlobalErrorResponse>({
//     error: {
//       message: err,
//       status: 500,
//     },
//   });
// });

// app.notFound(async (c) => {
//   return c.text(
//     `Oops! There is nothing here! 404 Not Found.                                                                          `
//   );
// });

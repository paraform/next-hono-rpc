// import { Client } from "./client"-example;
import { Server } from "./server-example";

export default async function Page() {
  return (
    <main className="flex flex-col gap-8 text-xl font-bold">
      <Server />
      {/* <Client /> */}
      <p>Api Route: /api/task</p>
      <iframe src="/api/task" width="600" height="400" />
    </main>
  );
}

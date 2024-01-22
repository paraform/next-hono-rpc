// import { Client } from "../../components/client";
import { Server } from "../../components/server";

export default async function Page() {
  return (
    <main className="flex flex-col gap-8 text-xl font-bold">
      Hello
      <Server />
      {/* <Client /> */}
      <p>Api Route: /api/hello</p>
      <iframe src="/api/task" width="600" height="400" />
    </main>
  );
}

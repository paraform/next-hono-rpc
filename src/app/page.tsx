import { Client } from "./components/client";
import { Server } from "./components/server";

export default async function Home() {
  return (
    <main className="text-xl font-bold flex flex-col gap-8">
      <Server />
      <Client />
      <p>Api Route: /api/hello</p>
      <iframe src="/api/hello" width="600" height="400" />
      <iframe src="/api/user" width="600" height="400" />
    </main>
  );
}

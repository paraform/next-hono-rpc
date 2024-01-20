import { Client } from "./client";
import { Server } from "./server";

export default async function Home() {
  return (
    <main>
      <Server />
      <Client />
    </main>
  );
}

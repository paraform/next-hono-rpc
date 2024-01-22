import { hono } from "@/server/api/client";
import { type TaskProps } from "@/server/db/types";

async function Server() {
  const url = hono.api.task.$url();
  const res = await fetch(url, { cache: "no-store" });
  console.log(res);
  if (res.ok) {
    console.log(await res.json());
  }

  return (
    <>
      <p>Server</p>
      <p className="text-sm">From Database:</p>
      {/* {tasks.map((task) => {
        return <p key={task.id}>{task.name}</p>;
      })} */}
    </>
  );
}

export { Server };

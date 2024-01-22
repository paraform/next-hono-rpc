import { hono } from "@/server/api/client";
import { type TaskProps } from "@/server/db/types";

async function Server() {
  const url = hono.api.task.$url();
  const res = await fetch(url, { cache: "no-store" });
  const tasks = (await res.json()) as TaskProps[];

  return (
    <>
      <p>Server</p>
      {tasks.length > 0 ? (
        <ul className="text-sm">
          {tasks.map((task) => {
            return <li key={task.id}>• {task.name}</li>;
          })}
        </ul>
      ) : (
        <p>No tasks</p>
      )}
    </>
  );
}

export { Server };

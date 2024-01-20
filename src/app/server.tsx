import { InferResponseType, hc } from "hono/client";
import { AppType } from "./api/[[...route]]/route";
import { env } from "@/env";

async function getData() {
  const client = hc<AppType>(env.URL);
  const url = client.api.users.$url();
  const res = await fetch(url, { cache: "no-store" });

  const $get = client.api.users.$get;
  type ResType = InferResponseType<typeof $get>;
  const json: ResType = await res.json();

  return json;
}

async function Server() {
  const data = await getData();

  return (
    <>
      <p>Server</p>
      {data.map((user) => {
        return <p key={user.id}>{user.name}</p>;
      })}
    </>
  );
}

export { Server };

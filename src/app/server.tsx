import { InferResponseType, hc } from "hono/client";
import { AppType } from "./api/[[...route]]/route";
import { env } from "@/env";

async function getData() {
  const client = hc<AppType>(env.URL);
  const url = client.api.hello_get.$url();
  const res = await fetch(url, { cache: "no-store" });

  const $get = client.api.hello_get.$get;
  type ResType = InferResponseType<typeof $get>;
  const json: ResType = await res.json();

  return json;
}

async function Server() {
  const data = await getData();

  return (
    <>
      <p>Server</p>
      <p>{data.message}</p>
    </>
  );
}

export { Server };

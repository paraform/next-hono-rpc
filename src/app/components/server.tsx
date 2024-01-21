import { hono } from "@/server/api/client";
import { UserProps } from "@/server/db/types";
import { InferResponseType } from "hono";

async function getHello() {
  const url = hono.api.hello.$url();
  const res = await fetch(url, { cache: "no-store" });

  const $get = hono.api.hello.$get;
  type ResType = InferResponseType<typeof $get>;
  const json: ResType = await res.json();

  return json;
}

async function getUsers() {
  const url = hono.api.user.$url();
  const res = await fetch(url, { cache: "no-store" });

  const json: UserProps[] = await res.json();

  return json;
}

async function Server() {
  const hello = await getHello();
  const users = await getUsers();

  return (
    <>
      <p>Server</p>
      <p>{hello.result}</p>
      <p className="text-sm">From Database:</p>
      {users.map((user) => {
        return <p key={user.id}>{user.name}</p>;
      })}
    </>
  );
}

export { Server };

"use client";

import { hc } from "hono/client";
import { AppType } from "./api/[[...route]]/route";
import useSWRMutation from "swr/mutation";
import { useState } from "react";

const client = hc<AppType>("/");

const postHello = async (_: string, { arg }: { arg: string }) => {
  const res = await client.api.hello.$post({
    form: {
      name: arg,
    },
  });
  return await res.json();
};

function Client() {
  const { trigger, isMutating, data } = useSWRMutation("hello", postHello);
  const [name, setName] = useState("");

  return (
    <div>
      <p>Client</p>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <button type="button" onClick={() => trigger(name)} disabled={isMutating}>
        Send
      </button>
      <p>{data?.message}</p>
    </div>
  );
}

export { Client };

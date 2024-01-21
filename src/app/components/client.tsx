"use client";

import useSWRMutation from "swr/mutation";
import { useState } from "react";
import { hono } from "@/server/api/client";

function Client() {
  return (
    <>
      <p>Client</p>
      <InputName />
    </>
  );
}

function InputName() {
  const { trigger, isMutating, data } = useSWRMutation(
    "hello",
    async (_: string, { arg }: { arg: string }) => {
      const res = await hono.api.hello.$post({
        form: {
          name: arg,
        },
      });

      return await res.json();
    }
  );
  const [name, setName] = useState("");

  return (
    <>
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
    </>
  );
}

export { Client };

import { useContext } from "react";
import { IcpContext } from "../context";

export const useActor = (name: string) => {
  const { client } = useContext(IcpContext);

  const actor = client.getActor(name);

  if (!actor) throw new Error("This actor doesn't exist");

  return actor;
};

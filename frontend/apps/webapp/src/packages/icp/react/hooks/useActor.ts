import { useContext } from "react";

import { IcpContext } from "../context";
import { CanisterTypes, CanisterTypeKeys } from "../../../../declarations";
import { ActorSubclassType } from "../../core/client";

export const useActor = <K extends CanisterTypeKeys>(
  name: K
): ActorSubclassType<CanisterTypes, K> => {
  const { client } = useContext(IcpContext);

  const actor = client.getActor(name);

  if (!actor) throw new Error("This actor doesn't exist");

  return actor;
};

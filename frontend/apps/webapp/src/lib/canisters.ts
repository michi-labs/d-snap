import * as test from "@/declarations/test";
import * as user from "@/declarations/user";

export const canisters = {
  test,
  user,
};

export type CanisterTypes = typeof canisters;

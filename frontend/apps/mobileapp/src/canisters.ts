import * as user from "./declarations/user";
import * as test from "./declarations/test";

export const Canisters = {
  user,
  test,
};

export type Canisters = typeof Canisters;

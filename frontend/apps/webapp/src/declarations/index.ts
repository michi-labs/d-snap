import * as test from './test';
import * as user from './user';

export const Canisters = {
        test,
user
    };

export type CanisterTypes = typeof Canisters;

export type CanisterTypeKeys = keyof CanisterTypes;
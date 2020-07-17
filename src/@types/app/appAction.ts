import { User } from "../user";

type FETCH_USER_DATA = "FETCH_USER_DATA";
type SIGN_IN = "SIGN_IN";

export type AppAction =
  | { type: FETCH_USER_DATA; payload: User }
  | { type: SIGN_IN };

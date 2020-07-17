import { useDispatch } from "react-redux";
import { User } from "../@types";

export function useAppActions() {
  const dispatch = useDispatch();
  function fetchUserData(userData: User) {
    return dispatch({ type: "FETCH_USER_DATA", payload: userData });
  }

  function signIn() {
    return dispatch({ type: "SIGN_IN" });
  }

  return {
    fetchUserData,
    signIn,
  };
}

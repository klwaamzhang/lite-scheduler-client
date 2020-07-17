import { useDispatch } from "react-redux";

export function useAuthDialogActions() {
  const dispatch = useDispatch();

  function openAuthDialog() {
    return dispatch({ type: "OPEN_AUTH_DIALOG" });
  }

  function closeAuthDialog() {
    return dispatch({ type: "CLOSE_AUTH_DIALOG" });
  }

  function goToLoginPage() {
    return dispatch({ type: "GO_TO_LOGIN_PAGE" });
  }

  function goToRegisterPage() {
    return dispatch({ type: "GO_TO_REGISTER_PAGE" });
  }

  return {
    openAuthDialog,
    closeAuthDialog,
    goToLoginPage,
    goToRegisterPage,
  };
}

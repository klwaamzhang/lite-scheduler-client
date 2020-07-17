import { useDispatch } from "react-redux";

export function useAccountDialogActions() {
  const dispatch = useDispatch();

  function openAccountDialog() {
    return dispatch({ type: "OPEN_ACCOUNT_DIALOG" });
  }

  function closeAccountDialog() {
    return dispatch({ type: "CLOSE_ACCOUNT_DIALOG" });
  }

  return {
    openAccountDialog,
    closeAccountDialog,
  };
}

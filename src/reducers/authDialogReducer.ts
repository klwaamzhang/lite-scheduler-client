import { AuthDialogState, AuthDialogAction } from "../@types/authDialog";

const initialState: AuthDialogState = {
  isAuthDialogOpened: false,
  isSigninPageOpened: true,
};

export function authDialogReducer(
  state = initialState,
  action: AuthDialogAction
): AuthDialogState {
  switch (action.type) {
    case "OPEN_AUTH_DIALOG":
      return { ...state, isAuthDialogOpened: true };
    case "CLOSE_AUTH_DIALOG":
      return { ...state, isAuthDialogOpened: false, isSigninPageOpened: true };
    case "GO_TO_LOGIN_PAGE":
      return { ...state, isSigninPageOpened: true };
    case "GO_TO_REGISTER_PAGE":
      return { ...state, isSigninPageOpened: false };
    default:
      return state;
  }
}

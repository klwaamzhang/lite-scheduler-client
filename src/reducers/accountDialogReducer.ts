import {
  AccountDialogState,
  AccountDialogAction,
} from "../@types/accountDialog";

const initialState: AccountDialogState = {
  isAccountDialogOpened: false,
};

export function accountDialogReducer(
  state = initialState,
  action: AccountDialogAction
): AccountDialogState {
  switch (action.type) {
    case "OPEN_ACCOUNT_DIALOG":
      return { ...state, isAccountDialogOpened: true };
    case "CLOSE_ACCOUNT_DIALOG":
      return { ...state, isAccountDialogOpened: false };
    default:
      return state;
  }
}

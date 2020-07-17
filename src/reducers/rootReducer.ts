import { combineReducers } from "redux";
import { authDialogReducer } from "./authDialogReducer";
import { appReducer } from "./appReducer";
import { accountDialogReducer } from "./accountDialogReducer";

export const rootReducer = combineReducers({
  app: appReducer,
  authDialog: authDialogReducer,
  accountDialog: accountDialogReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

import React from "react";
import Dialog from "@material-ui/core/Dialog";
import RegisterPage from "./RegisterPage";
import SignInPage from "./SignInPage";
import { useAuthDialogActions } from "../../actions";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { DialogContent } from "../Utilities/DialogContent";

export default function AuthDialog() {
  const { isAuthDialogOpened, isSigninPageOpened } = useSelector(
    (state: RootState) => state.authDialog
  );
  const { closeAuthDialog } = useAuthDialogActions();

  return (
    <Dialog
      aria-labelledby="customized-dialog-title"
      open={isAuthDialogOpened}
      onClose={closeAuthDialog}
    >
      <DialogContent>
        {isSigninPageOpened ? <SignInPage /> : <RegisterPage />}
      </DialogContent>
    </Dialog>
  );
}

import React from "react";
import { Theme, withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import RegisterPage from "./RegisterPage";
import SignInPage from "./SignInPage";
import { useAuthDialogActions } from "../../actions";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

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

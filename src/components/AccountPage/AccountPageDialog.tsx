import React from "react";
import { Theme, withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import Accountpage from "./AccountPage";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { useAccountDialogActions } from "../../actions";

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export default function AccountPageDialog() {
  const isAccountDialogOpened = useSelector(
    (state: RootState) => state.accountDialog.isAccountDialogOpened
  );
  const { closeAccountDialog } = useAccountDialogActions();

  return (
    <Dialog
      aria-labelledby="customized-dialog-title"
      onClose={closeAccountDialog}
      open={isAccountDialogOpened}
    >
      <DialogContent>
        <Accountpage />
      </DialogContent>
    </Dialog>
  );
}

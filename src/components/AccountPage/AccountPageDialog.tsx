import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Accountpage from "./AccountPage";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { useAccountDialogActions } from "../../actions";
import { DialogContent } from "../Utilities/DialogContent";

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

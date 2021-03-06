import { withStyles, Theme } from "@material-ui/core";
import MuiDialogContent from "@material-ui/core/DialogContent";

export const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

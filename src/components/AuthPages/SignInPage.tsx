import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Copyright from "../Utilities/Copyright";
import { useAuthDialogActions, useAppActions } from "../../actions";
import { SERVER_URL } from "../../environment/env";
import axios from "axios";
import { Backdrop, CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  loading: {
    marginLeft: theme.spacing(1),
  },
}));

export default function SignInPage() {
  const classes = useStyles();
  const { fetchUserData, signIn } = useAppActions();
  const { closeAuthDialog, goToRegisterPage } = useAuthDialogActions();
  const [formData, setFormData] = React.useState({
    emailAddress: "",
    password: "",
  });
  const [open, setOpen] = React.useState(false);

  const handleBackDropClose = () => {
    setOpen(false);
  };
  const handleBackDropOpen = () => {
    setOpen(true);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    handleBackDropOpen();
    axios.post(SERVER_URL + "/signin", formData).then((res: any) => {
      console.log(res.data);
      handleBackDropClose();
      if (res.data.msg === "SignIn Succeeded") {
        fetchUserData(res.data);
        signIn();
        closeAuthDialog();
      } else {
        alert(res.data.msg);
      }
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.emailAddress}
            onChange={(event: any) => {
              setFormData({
                ...formData,
                emailAddress: event.target.value,
              });
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={(event: any) => {
              setFormData({
                ...formData,
                password: event.target.value,
              });
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link href="#" variant="body2" onClick={goToRegisterPage}>
                {"Don't have an account? Register"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
        <p className={classes.loading}>Loading...</p>
      </Backdrop>
    </Container>
  );
}

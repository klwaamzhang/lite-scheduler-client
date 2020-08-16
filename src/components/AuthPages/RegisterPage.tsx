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
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import {
  InputLabel,
  MenuItem,
  CircularProgress,
  Backdrop,
} from "@material-ui/core";
import Copyright from "../Utilities/Copyright";
import { useAuthDialogActions } from "../../actions";
import { SERVER_URL } from "../../environment/env";
import axios from "axios";

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  loading: {
    marginLeft: theme.spacing(1),
  },
}));

export default function RegisterPage() {
  const classes = useStyles();
  const { goToLoginPage } = useAuthDialogActions();
  const [formData, setFormData] = React.useState({
    emailAddress: "",
    userName: "",
    password: "",
    accountType: "Regular",
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
    axios.post(SERVER_URL + "/signup", formData).then((res: any) => {
      handleBackDropClose();
      if (res.data.msg === "SignUp Succeeded") {
        goToLoginPage();
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
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={formData.emailAddress}
                onChange={(event: any) => {
                  setFormData({
                    ...formData,
                    emailAddress: event.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="userName"
                label="User Name"
                name="userName"
                autoComplete="uname"
                value={formData.userName}
                onChange={(event: any) => {
                  setFormData({
                    ...formData,
                    userName: event.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
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
            </Grid>
            <Grid item xs={12}>
              <FormControl required className={classes.formControl}>
                <InputLabel id="labelAccountType">
                  Choose Account Type
                </InputLabel>
                <Select
                  required
                  labelId="labelAccountType"
                  id="accountType"
                  value={formData.accountType}
                  onChange={(event: any) => {
                    setFormData({
                      ...formData,
                      accountType: event.target.value,
                    });
                  }}
                >
                  <MenuItem value="Regular">Regular</MenuItem>
                  <MenuItem value="Student">Student</MenuItem>
                  <MenuItem value="Senior">Senior</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2" onClick={goToLoginPage}>
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
        <p className={classes.loading}>Loading...</p>
      </Backdrop>
    </Container>
  );
}

import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { InputLabel, MenuItem } from "@material-ui/core";
import Copyright from "../UtilitiesComponents/Copyright";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";

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
}));

export default function AccountPage() {
  const classes = useStyles();
  const userData = useSelector((state: RootState) => state.app.userData);

  const [formData, setFormData] = React.useState(userData);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const res = fetch("http://localhost:8555/updateUserInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    res
      .then((res) => res.json())
      .then((data: any) => {
        alert(data.msg);
        window.location.reload();
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
          USER ACCOUNT
        </Typography>
        <form
          data-testid="account-form"
          className={classes.form}
          onSubmit={handleSubmit}
        >
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
            UPDATE
          </Button>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="secondary"
            onClick={() => window.location.reload()}
          >
            SIGN OUT
          </Button>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  AppBar,
  Container,
  Grid,
  Paper,
  Toolbar,
  Typography
} from "@material-ui/core";
import TasksComponent from "./TasksComponent";
import LoginButtonComponent from "./AuthButtonComponent";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  title: {
    flexGrow: 1
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  appBarSpacer: theme.mixins.toolbar,
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    "overflow-y": "hidden",
    flexDirection: "column"
  }
}));

export default () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute">
        <Toolbar>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Dashboard
          </Typography>
          <LoginButtonComponent />
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container justify="center">
            <Grid item xs={12} md={8}>
              <Paper className={classes.paper}>
                <TasksComponent />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
};

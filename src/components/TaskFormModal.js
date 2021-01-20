import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  IconButton,
  MenuItem,
  Modal,
  Paper,
  TextField
} from "@material-ui/core";
import TitleComponent from "./TitleComponent";
import CloseIcon from "@material-ui/icons/Close";
import { Query } from "react-apollo";
import { USERS_LIST_QUERY } from "../shared/users.queries";
import { makeStyles } from "@material-ui/core/styles";
import { TASK_MODEL } from "../models/task.model";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export const TaskFormModal = ({
  open,
  loading,
  onSubmit,
  onToggle,
  title: modalTitle = "New Task",
  task = TASK_MODEL
}) => {
  const [title, setTitle] = useState(task.title);
  const [user, setUser] = useState(task.assignedUser.id);
  const [completed, setCompleted] = useState(task.completed);

  useEffect(() => {
    setTitle(task.title);
    setUser(task.assignedUser.id);
    setCompleted(task.completed);
  }, [task]);

  const classes = useStyles();

  const handleSubmit = () => {
    onSubmit({
      title,
      completed,
      assignedUser: { connect: { id: user } }
    });
  };

  return (
    <Modal open={open}>
      <Paper className={classes.paperModal}>
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="space-between"
        >
          <TitleComponent>{modalTitle}</TitleComponent>
          <IconButton color="secondary" aria-label="Cancel" onClick={onToggle}>
            <CloseIcon />
          </IconButton>
        </Grid>
        <Query query={USERS_LIST_QUERY} fetchPolicy={"cache-first"}>
          {({ data: usersData, loading: loadingUsersQuery }) => {
            return (
              <form className={classes.form}>
                <TextField
                  required
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  label="Task Title"
                  name="title"
                  autoFocus
                  value={title}
                  onChange={event => setTitle(event.target.value)}
                />

                <TextField
                  required
                  disabled={loadingUsersQuery}
                  variant="outlined"
                  margin="normal"
                  select
                  value={user}
                  onChange={event => setUser(event.target.value)}
                  fullWidth
                  label="User"
                >
                  {usersData &&
                    usersData.usersList.items.map(user => (
                      <MenuItem key={user.id} value={user.id}>
                        {user.firstName} {user.lastName}
                      </MenuItem>
                    ))}
                </TextField>

                <FormControlLabel
                  control={
                    <Switch
                      checked={completed}
                      onChange={event => setCompleted(event.target.checked)}
                      name="Completed"
                      color="primary"
                    />
                  }
                  label="Completed"
                />

                <Button
                  disabled={loading || loadingUsersQuery}
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  className={classes.submit}
                >
                  Submit
                </Button>
              </form>
            );
          }}
        </Query>
      </Paper>
    </Modal>
  );
};

const useStyles = makeStyles(theme => ({
  form: {
    width: "100%",
    margin: theme.spacing(1)
  },
  paperModal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  ButtonGroup,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import TitleComponent from "./TitleComponent";
import {
  CREATE_TASK_MUTATION,
  DELETE_TASK_MUTATION,
  TASKS_LIST_QUERY,
  UPDATE_TASK_MUTATION
} from "../shared/tasks.queries";
import { TaskFormModal } from "./TaskFormModal";

const TasksComponent = ({}) => {
  const [openModal, setOpenModal] = React.useState(false);
  const [openEditModal, setOpenEditModal] = React.useState(false);

  const [editTask, setEditTask] = React.useState();

  const {
    refetch: reFetchTasks,
    data: taskData,
    loading: loadingTasks
  } = useQuery(TASKS_LIST_QUERY);

  const [createTask, { loading: loadingCreation }] = useMutation(
    CREATE_TASK_MUTATION,
    {
      onCompleted: () => {
        reFetchTasks();
        setOpenModal(false);
      }
    }
  );

  const [updateTask, { loading: loadingUpdate }] = useMutation(
    UPDATE_TASK_MUTATION,
    {
      onCompleted: () => {
        reFetchTasks();
        setOpenEditModal(false);
      }
    }
  );

  const [removeTask] = useMutation(DELETE_TASK_MUTATION, {
    onCompleted: reFetchTasks
  });

  const handleDeleteTask = task => removeTask({ variables: { id: task.id } });

  const onSubmit = async task => {
    try {
      await createTask({ variables: { data: task } });
    } catch (err) {
      console.log(err);
      alert("invalid data");
    }
  };

  const onEdit = async task => {
    try {
      await updateTask({ variables: { data: { id: editTask.id, ...task } } });
    } catch (err) {
      console.log(err);
      alert("invalid data");
    }
  };

  const selectEditTask = task => {
    setEditTask(task);
    setOpenEditModal(true);
  };

  return (
    <React.Fragment>
      <Grid container direction="row" justify="space-between">
        <TitleComponent>Recent Tasks</TitleComponent>
        <IconButton
          edge="end"
          color="primary"
          aria-label="New Task"
          onClick={() => setOpenModal(true)}
        >
          <AddIcon />
        </IconButton>
      </Grid>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>User</TableCell>
            <TableCell>Completed</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loadingTasks ? (
            <Typography>Loading...</Typography>
          ) : (
            taskData.tasksList.items.map(task => (
              <TableRow key={task.id}>
                <TableCell>{task.title}</TableCell>
                <TableCell>
                  {task.assignedUser.firstName} {task.assignedUser.lastName}
                </TableCell>
                <TableCell>{task.completed ? "Yes" : "No"}</TableCell>
                <TableCell>
                  <ButtonGroup color="primary">
                    <IconButton
                      onClick={() => selectEditTask(task)}
                      aria-label="edit"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDeleteTask(task)}
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <TaskFormModal
        open={openModal}
        loading={loadingCreation}
        onToggle={() => setOpenModal(!openModal)}
        onSubmit={onSubmit}
      />
      <TaskFormModal
        open={openEditModal}
        loading={loadingUpdate}
        onToggle={() => setOpenEditModal(!openEditModal)}
        onSubmit={onEdit}
        task={editTask}
        title="Edit Task"
      />
    </React.Fragment>
  );
};

export default TasksComponent;

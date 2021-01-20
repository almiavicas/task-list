import gql from "graphql-tag";

export const TASKS_LIST_QUERY = gql`
  query TasksList {
    tasksList {
      items {
        id
        title
        completed
        assignedUser {
          id
          firstName
          lastName
        }
      }
    }
  }
`;

export const CREATE_TASK_MUTATION = gql`
  mutation TaskCreate($data: TaskCreateInput!) {
    taskCreate(data: $data) {
      id
      title
      assignedUser {
        id
      }
    }
  }
`;

export const UPDATE_TASK_MUTATION = gql`
  mutation TaskUpdate($data: TaskUpdateInput!) {
    taskUpdate(data: $data) {
      id
      title
      assignedUser {
        id
      }
    }
  }
`;

export const DELETE_TASK_MUTATION = gql`
  mutation TaskDelete($id: ID!) {
    taskDelete(filter: { id: $id }) {
      success
    }
  }
`;

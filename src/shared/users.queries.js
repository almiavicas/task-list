import gql from "graphql-tag";

export const USERS_LIST_QUERY = gql`
  query UsersList {
    usersList {
      items {
        id
        email
        firstName
        lastName
      }
    }
  }
`;

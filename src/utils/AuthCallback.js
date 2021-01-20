import React, { useEffect } from "react";
import { withAuth, gql } from "@8base/react-sdk";
import { withApollo } from "react-apollo";

/* Query the for the ID of the logged in user */
const CURRENT_USER = gql`
  query currentUser {
    user {
      id
    }
  }
`;

/* Authentication success callback function */
const AuthCallback = ({ auth, history, client }) => {
  useEffect(() => {
    const completeAuth = async () => {
      /* Pull required values from authorized user data */
      const { idToken } = await auth.authClient.getAuthorizedData();
      /* Context for API calls */

      const context = {
        headers: {
          authorization: `Bearer ${idToken}`
        }
      };

      try {
        /* Check if a user exists, if not an error will be thrown */
        await client.query({ query: CURRENT_USER, context });
      } catch (error) {
        console.log("User not found in 8base", error);
      }

      /* After succesfull signup store token in local storage */
      await auth.authClient.setState({ token: idToken });
      /* Redirect back to home page */
      history.replace("/");
    };
    /* Run authentication function */
    completeAuth();
  }, [auth.authClient, client, history]);

  return <p>Please wait...</p>;
};

/* Decorated export */
export default withAuth(withApollo(AuthCallback));

import React from "react";
import { withAuth } from "@8base/react-sdk";
import { Button } from "@material-ui/core";

/* Component generator function being passed auth data */
const Login = ({ auth }) => {
  const { isAuthorized, authClient } = auth;

  /* Component to display when NOT authorized*/
  if (!isAuthorized) {
    return (
      <Button color="inherit" onClick={() => authClient.authorize()}>
        Login
      </Button>
    );
  }

  /* Component to display when authorized*/
  return (
    <Button color="inherit" onClick={() => authClient.logout()}>
      Logout
    </Button>
  );
};

/* Decorate exported function with withAuth */
export default withAuth(Login);

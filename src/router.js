import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DashboardComponent from "./components/DashboardComponent";
import AuthCallback from "./utils/AuthCallback";
import { withApollo } from "react-apollo";
import { ApolloProvider } from "@apollo/client";

const MyRouter = ({ client }) => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route path="/auth/callback" component={AuthCallback} exact />
          <Route path="/" component={DashboardComponent} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
};

export default withApollo(MyRouter);

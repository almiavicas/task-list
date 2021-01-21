import React from 'react';
import MyRouter from "./router";
import { Auth, AUTH_STRATEGIES } from "@8base/auth";
import { AppProvider } from "@8base/react-sdk";

const URI = "https://api.8base.com/ckk3j7gxc009s07jtdogbeasu";

const authClient = Auth.createClient(
  {
    strategy: AUTH_STRATEGIES.WEB_COGNITO,
    subscribable: true
  },
  {
    clientId: "hegsep8a8g61ej898mokag7jn",
    domain: "https://6006680e35d3a60007c6a985.auth.us-east-1.amazoncognito.com",
    redirectUri: `${window.location.origin}/auth/callback`,
    logoutRedirectUri: `${window.location.origin}/logout`
  }
);

function App() {
  return (
    <div className="App">
      <body>
        <AppProvider uri={URI} authClient={authClient}>
          {({ loading }) => {
            if (loading) {
              return <p>Please wait...</p>;
            }
            return <MyRouter />;
          }}
        </AppProvider>
      </body>
    </div>
  );
}

export default App;

import { React, useContext } from "react";
import { UserContext } from "context/UserContext";
import { Redirect, Route } from "react-router-dom";

export default function ProtectedRoute({ component: Component, ...rest }) {
  const [user, setUser] = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (user.isLoggedIn) {
          return <Component {...props} />;
        } else {
          return <Redirect to="authentication/sign-in" />;
        }
      }}
    />
  );
}

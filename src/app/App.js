import React from "react";
import { Route, Switch } from "react-router-dom";
import Users from "./layout/users";
import Main from "./layout/main";
import Login from "./layout/login";
import NavBar from "./components/navBar";

const App = () => {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route path="/users/:userId?" component={Users} />
        <Route path="/" exact component={Main} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
};

export default App;

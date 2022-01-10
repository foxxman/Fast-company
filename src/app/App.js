import React from "react";
// import UsersList from "./components/usersList";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Users from "./layout/users";
import Main from "./layout/main";
import Login from "./layout/login";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/users" component={Users} />
          <Route path="/" exact component={Main} />
          <Route path="/login" component={Login} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;

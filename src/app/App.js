import React from "react";
import { Route, Switch } from "react-router-dom";
import Users from "./layout/users";
import Main from "./layout/main";
import Login from "./layout/login";
import NavBar from "./components/ui/navBar";
import UserEditPage from "./components/page/userEditPage";
import { ToastContainer } from "react-toastify";
import ProfessionProvider from "./hooks/useProfession";
import QualityProvider from "./hooks/useQuality";

const App = () => {
  return (
    <div>
      <NavBar />
      <QualityProvider>
        <ProfessionProvider>
          <Switch>
            <Route path="/users/:userId?/edit" component={UserEditPage} />
            <Route path="/users/:userId?" component={Users} />
            <Route path="/login/:type?" component={Login} />

            <Route path="/" exact component={Main} />
          </Switch>
        </ProfessionProvider>
      </QualityProvider>
      <ToastContainer />
    </div>
  );
};

export default App;

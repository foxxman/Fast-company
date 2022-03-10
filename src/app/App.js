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
import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layout/logOut";

const App = () => {
  return (
    <div>
      <AuthProvider>
        <NavBar />
        <QualityProvider>
          <ProfessionProvider>
            <Switch>
              <ProtectedRoute
                path="/users/:userId?/edit"
                component={UserEditPage}
              />
              <ProtectedRoute path="/users/:userId?" component={Users} />
              <Route path="/login/:type?" component={Login} />
              <Route path="/logout" component={LogOut} />
              <Route path="/" exact component={Main} />
            </Switch>
          </ProfessionProvider>
        </QualityProvider>
      </AuthProvider>
      <ToastContainer />
    </div>
  );
};

export default App;

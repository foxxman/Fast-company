import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../services/user.service";
import { toast } from "react-toastify";
import localStorageService, {
  setTokens
} from "../services/localStorage.service";
import { useHistory } from "react-router-dom";

export const httpAuth = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1/",
  params: {
    key: process.env.REACT_APP_FIREBASE_KEY
  }
});
const httpLogin = axios.create();
const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const keyFireBasePrivate = process.env.REACT_APP_FIREBASE_KEY;

  const [currentUser, setUser] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);

  useEffect(() => {
    if (localStorageService.getAccessToken()) {
      getUserData();
    } else {
      setLoading(false);
    }
  }, []);

  async function getUserData() {
    try {
      const { content } = await userService.getCurrentUser();
      setUser(content);
    } catch (error) {
      errorCatcher(error);
    } finally {
      setLoading(false);
    }
  }

  function logOut() {
    localStorageService.removeAuthData();
    setUser(null);
    history.push("/");
  }

  async function signIn({ email, password }) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${keyFireBasePrivate}`;

    try {
      const { data } = await httpLogin.post(url, {
        email,
        password,
        returnSecureToken: true
      });
      // console.log("response", data);
      // заносим токены в localStorage
      setTokens(data);
      await getUserData();
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;

      if (code === 400) {
        if (message === "EMAIL_NOT_FOUND") {
          const errorObject = {
            email: "Email не найден"
          };
          throw errorObject;
        }
        if (message === "INVALID_PASSWORD") {
          const errorObject = {
            password: "Неправильный пароль"
          };
          throw errorObject;
        }
      }
    }
  }

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  async function signUp({ email, password, ...rest }) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${keyFireBasePrivate}`;

    try {
      const { data } = await httpAuth.post(url, {
        email,
        password,
        returnSecureToken: true
      });

      // заносим токены в localStorage
      setTokens(data);
      //   console.log("dataAuth", data);
      await createUser({
        _id: data.localId,
        email,
        rate: randomInt(1, 5),
        image: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
          .toString(36)
          .substring(7)}.svg`,
        complitedMeetings: randomInt(0, 200),
        ...rest
      });
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;

      if (code === 400) {
        if (message === "EMAIL_EXISTS") {
          const errorObject = {
            email: "Пользователь с таким Email уже существует"
          };
          throw errorObject;
        }
      }
    }
  }

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  }

  async function createUser(data) {
    try {
      const { content } = await userService.create(data);
      // console.log(content);
      setUser(content);
    } catch (error) {
      errorCatcher(error);
    }
  }

  async function updateUser(data) {
    try {
      const { content } = await userService.update(data);
      setUser(content);
    } catch (error) {
      errorCatcher(error);
    }
  }

  return (
    <AuthContext.Provider
      value={{ updateUser, logOut, signUp, currentUser, signIn, isLoading }}
    >
      {!isLoading ? children : ""}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default AuthProvider;

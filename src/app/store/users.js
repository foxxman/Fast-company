import { createAction, createSlice } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import userService from "../services/user.service";
import randomInt from "../utils/randomInt";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    auth: null,
    isLoggedIn: false
  },
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true;
    },
    usersReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    usersRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    authRequestSuccess: (state, action) => {
      state.auth = { ...action.payload, isLoggedIn: true };
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },
    userCreated: (state, action) => {
      if (!Array.isArray(state.entities)) state.entities = [];
      state.entities.push(action.payload);
    }
  }
});

const authRequested = createAction("users/authRequested");
const userCreateRequested = createAction("users/userCreateRequested");
const createUserFailed = createAction("users/userCreateFailed");

const { reducer: usersReducer, actions } = usersSlice;
const {
  usersRequested,
  usersReceived,
  usersRequestFailed,
  authRequestSuccess,
  authRequestFailed,
  userCreated
} = actions;

export const loadUsersList = () => async (dispatch, getState) => {
  dispatch(usersRequested());

  try {
    const { content } = await userService.get();
    // console.log(content);
    dispatch(usersReceived(content));
  } catch (error) {
    dispatch(usersRequestFailed(error.message));
  }
};

export const getUsersList = () => (state) => {
  return state.users.entities;
};

export const getUserById = (userId) => (state) => {
  if (state.users.entities) {
    return state.users.entities.find((u) => u._id === userId);
  }
};

// =======useAuth==========================
const createUser = (data) => async (dispatch) => {
  dispatch(userCreateRequested());
  try {
    const { content } = await userService.create(data);
    dispatch(userCreated(content));
  } catch (error) {
    dispatch(createUserFailed(error.message));
  }
};

export const signUp =
  ({ email, password, ...rest }) =>
  async (dispatch) => {
    dispatch(authRequested());

    try {
      const data = await authService.register({ email, password });
      localStorageService.setTokens(data);

      console.log("data signUp users.js: ", data);

      dispatch(authRequestSuccess({ userId: data.localId }));

      dispatch(
        createUser({
          _id: data.localId,
          email,
          rate: randomInt(1, 5),
          completedMeetings: randomInt(0, 200),
          image: `https://avatars.dicebear.com/api/avataaars/${(
            Math.random() + 1
          )
            .toString(36)
            .substring(7)}.svg`,
          ...rest
        })
      );
    } catch (error) {
      dispatch(authRequestFailed(error.message));
    }
  };

// ========================================

export default usersReducer;

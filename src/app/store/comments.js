import { createSlice } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    commentsRequested: (state) => {
      state.isLoading = true;
    },
    commentsReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    commentsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    commentsRemove: (state, action) => {
      state.entities = state.entities.filter((c) => c._id !== action.payload);
      console.log(action);
    },
    commentsCreate: (state, action) => {
      console.log(action);
      state.entities.push({ ...action.payload });
    }
  }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
  commentsRequested,
  commentsReceived,
  commentsRequestFailed,
  commentsRemove,
  commentsCreate
} = actions;

export const loadCommentsList = (id) => async (dispatch) => {
  dispatch(commentsRequested());
  try {
    const { content } = await commentService.getComments(id);
    dispatch(commentsReceived(content));
  } catch (error) {
    dispatch(commentsRequestFailed(error.message));
  }
};

export const getComments = () => (state) => state.comments.entities;

export const getCommentsLoadingStatus = () => (state) =>
  state.comments.isLoading;

export const removeComment = (commentId) => async (dispatch) => {
  try {
    const { content } = await commentService.removeComment(commentId);
    console.log(content);
    if (content === null) dispatch(commentsRemove(commentId));
  } catch (error) {
    dispatch(commentsRequestFailed(error.message));
  }
};

export const createComment = (payload) => async (dispatch) => {
  try {
    const { content } = await commentService.createComment(payload);
    console.log(content);
    dispatch(commentsCreate(content));
  } catch (error) {
    dispatch(commentsRequestFailed(error.message));
  }
};

export default commentsReducer;

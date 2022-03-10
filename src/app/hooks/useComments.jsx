import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { useAuth } from "./useAuth";
import { nanoid } from "nanoid";
import commentService from "../services/comment.service";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

// import { toast } from "react-toastify";

const CommentContext = React.createContext();

export const useComments = () => {
  return useContext(CommentContext);
};

export const CommentsProvider = ({ children }) => {
  const { userId } = useParams();
  const [comments, setComments] = useState([]);
  const { currentUser } = useAuth();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getComments();
  }, [userId]);

  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);

  function errorCatcher(error) {
    const { message } = error.response.data;
    setError(message);
  }

  async function createComment(data) {
    const comment = {
      ...data,
      created_at: Date.now(),
      userId: currentUser._id,
      _id: nanoid()
    };

    try {
      const { content } = await commentService.createComment(comment);
      console.log(content);
      setComments((prev) => [...prev, content]);
    } catch (error) {
      errorCatcher(error);
    }

    // console.log(comment);
  }

  async function getComments() {
    try {
      const { content } = await commentService.getComments(userId);
      setComments(content);
      // console.log(content);
    } catch (error) {
      errorCatcher(error);
    } finally {
      setLoading(false);
    }
  }

  async function removeComment(id) {
    try {
      const { data } = await commentService.removeComment(id);
      if (!data) {
        setComments((prev) => prev.filter((c) => c._id !== id));
      }
    } catch (error) {
      errorCatcher(error);
    }
  }

  return (
    <CommentContext.Provider
      value={{ removeComment, comments, createComment, isLoading }}
    >
      {children}
    </CommentContext.Provider>
  );
};

CommentsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default CommentsProvider;

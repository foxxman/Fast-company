import React, { useEffect, useState } from "react";
import API from "../../api";
import Comment from "../common/comment";
import CommentForm from "./commentForm";
import { useParams } from "react-router-dom";

const CommentsList = () => {
  const [comments, setComments] = useState();
  const { userId } = useParams();
  const updateComments = (comment) => {
    setComments((prev) => [...prev, comment]);
  };

  useEffect(() => {
    API.comments.fetchCommentsForUser(userId).then((result) => {
      setComments(result);
    });
  }, []);

  const handleDelete = (id) => {
    API.comments.remove(id);
    setComments((prev) => prev.filter((comment) => comment._id !== id));
  };

  return (
    <>
      <div className="card mb-2">
        {" "}
        <div className="card-body ">
          <CommentForm {...{ updateComments }} />
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-body ">
          <h2>Comments</h2>
          <hr />
          {comments
            ? comments.length !== 0
              ? comments
                  .sort((a, b) => b.created_at - a.created_at)
                  .map((comment) => (
                    <Comment
                      onDelete={handleDelete}
                      commentTime={Number(comment.created_at)}
                      userId={comment.userId}
                      commentId={comment._id}
                      commentText={comment.content}
                      key={comment._id}
                    />
                  ))
              : "No any comments"
            : "Loading..."}
        </div>
      </div>
    </>
  );
};

export default CommentsList;

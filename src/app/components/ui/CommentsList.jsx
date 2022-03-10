import React from "react";
import Comment from "../common/comment";
import CommentForm from "./commentForm";
import { useComments } from "../../hooks/useComments";

const CommentsList = () => {
  const { comments, removeComment } = useComments();

  const updateComments = (comment) => {
    // setComments((prev) => [...prev, comment]);
  };

  const handleDelete = (id) => {
    removeComment(id);
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

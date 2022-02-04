import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import API from "../../api";

const Comment = ({ commentText, userId, commentTime, onDelete, commentId }) => {
  //   console.log("hi");
  const [user, setUser] = useState();

  useEffect(
    () =>
      API.users.getById(userId).then((result) => {
        setUser(result);
      }),
    []
  );

  const renderImg = () => (
    <img
      src={`https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
        .toString(36)
        .substring(7)}.svg`}
      className="rounded-circle shadow-1-strong me-3"
      alt="avatar"
      width="65"
    />
  );

  const renderDate = (miliSeconds) => {
    const month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Juту",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec"
    ];

    const date = new Date(miliSeconds);
    const currentDate = new Date();
    const diff = currentDate.getTime() - date.getTime();

    if (diff / 1000 <= 60) return "1 minute ago";
    else if (diff / 1000 / 60 <= 5) return "5 minutes ago";
    else if (diff / 1000 / 60 <= 30) return "30 minutes ago";
    else if (diff / 1000 / 60 / 60 <= 24)
      return `${date.getHours()}:${date.getMinutes()}`;
    else if (diff / 1000 / 60 / 60 / 24 <= 30)
      return `${date.getDate()} ${month[date.getMonth()]}`;
    else
      return `${date.getDate()} ${
        month[date.getMonth()]
      } ${date.getFullYear()}`;
  };

  return (
    <div className="bg-light card-body  mb-3">
      <div className="row">
        <div className="col">
          <div className="d-flex flex-start ">
            {user ? (
              <>
                {renderImg()}
                <div className="flex-grow-1 flex-shrink-1">
                  <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="mb-1 ">
                        {user.name}
                        <span className="small">
                          {" "}
                          {renderDate(commentTime)}
                        </span>
                      </p>
                      <button
                        onClick={() => onDelete(commentId)}
                        className="btn btn-sm text-primary d-flex align-items-center"
                      >
                        <i className="bi bi-x-lg"></i>
                      </button>
                    </div>
                    <p className="small mb-0">{commentText}</p>
                  </div>
                </div>
              </>
            ) : (
              "Loading..."
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

Comment.propTypes = {
  onDelete: PropTypes.func.isRequired,
  commentText: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  commentTime: PropTypes.number.isRequired,
  commentId: PropTypes.string.isRequired
};

export default Comment;

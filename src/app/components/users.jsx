import React from "react";
import User from "./user";

const Users = ({ handleBookmark, handleDelete, users }) => {
  return (
    <>
      {users.length ? (
        <table className="table">
          <thead>
            <tr>
              <th className="d-block text-center" scope="col">
                Имя
              </th>
              <th className="text-center" scope="col">
                Качества
              </th>
              <th className="text-center" scope="col">
                Профессия
              </th>
              <th className="text-center" scope="col">
                Встретился, раз
              </th>
              <th className="text-center" scope="col">
                Оценка
              </th>
              <th className="text-center" scope="col">
                Избранное
              </th>
              <th className="text-center" scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <User
                key={user._id}
                handleBookmark={handleBookmark}
                handleDelete={handleDelete}
                user={user}
              />
            ))}
          </tbody>
        </table>
      ) : (
        ""
      )}
    </>
  );
};

export default Users;

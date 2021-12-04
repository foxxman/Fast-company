import React, { useState } from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  console.log(users);

  const renderPhrase = (number) => {
    const plural = [2, 3, 4];

    let human = "человек";
    if (plural.includes(number % 10)) human = "человекa";
    if (number > 10 && number < 20) human = "человек";

    return number !== 0 ? (
      <h1 className="badge fs-4 bg-primary m-2">
        С тобой хотят встретиться {number} {human}.
      </h1>
    ) : (
      <h1 className="badge fs-4 bg-danger m-2">
        С тобой ещё никто не захотел встретиться.
      </h1>
    );
  };

  const handleDelete = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
  };

  return (
    <>
      {renderPhrase(users.length)}
      {users.length ? (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>
                  {user.qualities.map((quality) => (
                    <span
                      className={`badge bg-${quality.color} m-1`}
                      key={quality._id}
                    >
                      {quality.name}
                    </span>
                  ))}
                </td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{`${user.rate}/5`}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
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

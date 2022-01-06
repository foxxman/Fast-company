import React, { useEffect, useState } from "react";
import Users from "./components/users";
import api from "./api";

const App = () => {
  const [users, setUsers] = useState();
  useEffect(() => api.users.fetchAll().then((result) => setUsers(result)), []);

  const handleDelete = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
  };

  const handleBookmark = (id) => {
    setUsers((prevUsers) => {
      return prevUsers.map((user) => {
        if (user._id === id) {
          return { ...user, bookmark: !user.bookmark };
        }
        return user;
      });
    });
  };

  return users ? (
    <Users
      handleBookmark={handleBookmark}
      handleDelete={handleDelete}
      users={users}
    />
  ) : (
    ""
  );
};

export default App;

import React, { useState } from "react";
import SearchStatus from "./components/searchStatus";
import Users from "./components/users";
import api from "./api";

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

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

  return (
    <>
      <SearchStatus usersNumber={users.length} />
      <Users
        handleBookmark={handleBookmark}
        handleDelete={handleDelete}
        users={users}
      />
    </>
  );
};

export default App;

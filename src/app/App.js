import React, { useState } from "react";
import SearchStatus from "./components/searchStatus";
import Users from "./components/users";
import api from "./api";

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
  };

  const handleBookmark = (userId) => {
    setUsers((prevUsers) => {
      const index = prevUsers.findIndex((user) => user._id === userId);
      prevUsers[index].bookmark = !prevUsers[index].bookmark;
      return [...prevUsers];
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

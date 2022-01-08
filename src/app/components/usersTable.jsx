import React from "react";
import PropTypes from "prop-types";
import Bookmark from "./bookmark";
import QualitiesList from "./qualitiesList";
import Table from "./table";
// import TableHeader from "./tableHeader";
// import TableBody from "./tableBody";

const UsersTable = ({
  users,
  handleDelete,
  handleBookmark,
  onSort,
  selectedSort
}) => {
  const columns = {
    name: { path: "name", name: "Имя" },
    qualities: {
      name: "Качества",
      component: (user) => <QualitiesList qualities={user.qualities} />
    },
    profession: { path: "profession.name", name: "Профессия" },
    completedMeetings: { path: "completedMeetings", name: "Встретился, раз" },
    rate: { path: "rate", name: "Оценка" },
    bookmark: {
      path: "bookmark",
      name: "Избранное",
      component: (user) => (
        <Bookmark
          id={user._id}
          handleBookmark={handleBookmark}
          bookmark={user.bookmark}
        />
      )
    },
    delete: {
      component: (user) => (
        <button
          className="btn btn-danger btn-sm d-block m-auto"
          onClick={() => handleDelete(user._id)}
        >
          Delete
        </button>
      )
    }
  };

  return (
    // <Table>
    //   <TableHeader {...{ onSort, selectedSort, columns }} />
    //   <TableBody {...{ data: users, columns }} />
    // </Table>
    <Table {...{ onSort, selectedSort, columns, data: users }} />
  );
};

UsersTable.propTypes = {
  handleBookmark: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired
};

export default UsersTable;

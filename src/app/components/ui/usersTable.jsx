import React from "react";
import PropTypes from "prop-types";
import Bookmark from "../common/bookmark";
import Qualities from "./qualities";
import Table from "../common/table/index";
import { Link } from "react-router-dom";
import Profession from "./profession";

const UsersTable = ({
  users,
  // handleDelete,
  handleBookmark,
  onSort,
  selectedSort
}) => {
  const columns = {
    name: {
      path: "name",
      name: "Имя",
      component: (user) => (
        <Link className="nav-link" to={`/users/${user._id}`}>
          {user.name}
        </Link>
      )
    },
    qualities: {
      name: "Качества",
      component: (user) => <Qualities qualities={user.qualities} />
    },
    profession: {
      component: (user) => <Profession id={user.profession} />,
      name: "Профессия"
    },
    completedMeetings: {
      path: "complitedMeetings",
      name: "Встретился, раз"
    },
    rate: { path: "rate", name: "Оценка" },
    bookmark: {
      path: "bookmark",
      name: "Избранное",
      component: (user) => (
        <Bookmark
          id={user._id}
          handleBookmark={handleBookmark}
          bookmark={false}
        />
      )
    }
    // delete: {
    //   component: (user) => (
    //     <button
    //       className="btn btn-danger btn-sm d-block m-auto"
    //       onClick={() => handleDelete(user._id)}
    //     >
    //       Delete
    //     </button>
    //   )
    // }
  };

  return <Table {...{ onSort, selectedSort, columns, data: users }} />;
};

UsersTable.propTypes = {
  handleBookmark: PropTypes.func.isRequired,
  // handleDelete: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired
};

export default UsersTable;

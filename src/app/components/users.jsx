import React, { useState } from "react";
import PropTypes from "prop-types";
import paginate from "../utils/paginate";
import Pagination from "./pagination";
import User from "./user";

const Users = ({ handleBookmark, handleDelete, users }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const count = users.length;
  const pageSize = 4;

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const userCrop = paginate(users, pageSize, currentPage);
  return (
    <>
      {count ? (
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
            {userCrop.map((user) => (
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
      <Pagination
        itemsCount={count}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </>
  );
};

Users.propTypes = {
  handleBookmark: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired
};

export default Users;

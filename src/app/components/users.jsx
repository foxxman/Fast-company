import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import paginate from "../utils/paginate";
import Pagination from "./pagination";
import SearchStatus from "./searchStatus";
import User from "./user";
import GroupList from "./groupList";
import API from "../api";
import _ from "lodash";

const Users = ({ handleBookmark, handleDelete, users }) => {
  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();

  useEffect(() => {
    API.professions.fetchAll().then((result) => setProfessions(result));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
  };

  const filteredUsers = selectedProf
    ? users.filter((user) => _.isEqual(user.profession, selectedProf))
    : users;

  const count = filteredUsers.length;

  const userCrop = paginate(filteredUsers, pageSize, currentPage);

  const clearFilter = () => setSelectedProf();

  return (
    <div className="d-flex">
      {professions && (
        <div className="d-flex flex-column flex-shrink-0 p-3">
          <GroupList
            selectedItem={selectedProf}
            items={professions}
            onItemSelect={handleProfessionSelect}
          />
          <button
            className="btn btn-secondary mt-2"
            onClick={() => clearFilter()}
          >
            Очистить
          </button>
        </div>
      )}
      <div className="d-flex flex-column">
        <SearchStatus usersNumber={count} />

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
        <div className="d-flex justify-content-center">
          <Pagination
            itemsCount={count}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

Users.propTypes = {
  handleBookmark: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired
};

export default Users;

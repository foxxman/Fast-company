import React, { useEffect, useState } from "react";
import paginate from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import SearchStatus from "../../ui/searchStatus";
import GroupList from "../../common/groupList";
import _ from "lodash";
import UsersTable from "../../ui/usersTable";
import TextField from "../../common/form/textField";
import { useUser } from "../../../hooks/useUsers";
import { useProfessions } from "../../../hooks/useProfession";
import { useAuth } from "../../../hooks/useAuth";

const UserListPage = () => {
  const pageSize = 4;
  const { isLoading: professionLoading, professions } = useProfessions();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProf, setSelectedProf] = useState();
  const [searchName, setSearchName] = useState("");
  const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
  const { users } = useUser();
  const { currentUser } = useAuth();

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  const clearSearch = () => setSearchName("");
  const clearFilter = () => setSelectedProf();

  const handleDelete = (userId) => {
    // setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    // console.log(userId);
  };

  const handleBookmark = (id) => {
    // setUsers((prevUsers) => {
    //   return prevUsers.map((user) => {
    //     if (user._id === id) {
    //       return { ...user, bookmark: !user.bookmark };
    //     }
    //     return user;
    //   });
    // });
    // const newArray = users.map((user) => {
    //   if (user._id === id) {
    //     return { ...user, bookmark: !user.bookmark };
    //   }
    //   return user;
    // });
    // console.log(newArray);
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleProfessionSelect = (item) => {
    clearSearch();
    setSelectedProf(item);
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  const handleSearchChange = (target) => setSearchName(target.value);

  const searchUsers = (users, searchString) => {
    return users.filter((user) =>
      user.name.toLowerCase().includes(searchString.toLowerCase())
    );
  };

  if (users) {
    if (searchName && selectedProf) clearFilter();

    function filterUsers(data) {
      const filteredUsers = searchName
        ? searchUsers(data, searchName)
        : selectedProf
        ? data.filter((user) => _.isEqual(user.profession, selectedProf))
        : data;

      return filteredUsers.filter((u) => u._id !== currentUser._id);
    }

    const filteredUsers = filterUsers(users);

    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const userCrop = paginate(sortedUsers, pageSize, currentPage);

    return (
      <div className="d-flex">
        {professions && !professionLoading && (
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
          <TextField
            type="text"
            name="search-name"
            value={searchName}
            onChange={handleSearchChange}
            placeholder="Search..."
            noDetecting={true}
          />

          {count ? (
            <UsersTable
              users={userCrop}
              handleBookmark={handleBookmark}
              handleDelete={handleDelete}
              onSort={handleSort}
              selectedSort={sortBy}
            />
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
  }
  return "loading...";
};

export default UserListPage;

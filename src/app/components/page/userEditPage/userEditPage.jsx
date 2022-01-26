import React from "react";
import { useParams } from "react-router-dom";
import UsersListPage from "../usersListPage";
import EditForm from "../../ui/EditForm";

const UserEditPage = () => {
  const params = useParams();
  const { userId } = params;

  return (
    <>
      {userId ? (
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6 offset-md-3 shadow p-4">
              <h3 className="mb-4">Edit</h3>
              <EditForm userId={userId} />
            </div>
          </div>
        </div>
      ) : (
        <UsersListPage />
      )}
    </>
  );
};

export default UserEditPage;

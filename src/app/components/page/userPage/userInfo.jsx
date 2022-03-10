import React from "react";
import PropTypes from "prop-types";
import CommentsList from "../../ui/CommentsList";
import UserCard from "../../ui/UserCard";
import QualitiesCard from "../../ui/QualitiesCard";
import MeetingsCard from "../../ui/MeetingsCard";
import CommentsProvider from "../../../hooks/useComments";

const UserInfo = ({ user }) => {
  return (
    <div className="container">
      <div className="row gutters-sm">
        <div className="col-md-4 mb-3">
          {/* =========CARD======== */}
          <UserCard {...{ user }} />
          {/* =========CARD======== */}
          <QualitiesCard qualities={user.qualities} />
          {/* =========CARD======== */}
          <MeetingsCard completedMeetings={user.complitedMeetings} />
        </div>
        <div className="col-md-8">
          <CommentsProvider>
            <CommentsList />
          </CommentsProvider>
        </div>
      </div>
    </div>
  );
};

UserInfo.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserInfo;

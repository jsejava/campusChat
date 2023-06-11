import React from "react";
import group from "../assets/group2.png";
import con from "../assets/group3.png";
import { AddChannel } from "../assets";

const TeamChannelList = ({
  setToggleContainer,
  children,
  error = false,
  loading,
  type,
  isCreating,
  setIsCreating,
  setCreateType,
  setIsEditing,
}) => {
  if (error) {
    return type === "team" ? (
      <div className="team-channel-list">
        <p className="team-channel-list__message">
          Connection error, please wait a moment and try again.
        </p>
      </div>
    ) : null;
  }

  if (loading) {
    return (
      <div className="team-channel-list">
        <p className="team-channel-list__message loading">
          {type === "team" ? "Groups" : "Connections"} loading...
        </p>
      </div>
    );
  }

  return (
    <div className="team-channel-list">
      <div className="team-channel-list__header">
        <p className="team-channel-list__header__title">
          {type === "team" ? (
            <>
              <span>
                <img src={group} alt="CampusConnection" width="20" />
              </span>{" "}
            </>
          ) : (
            <>
              <span>
                <img src={con} alt="CampusConnection" width="20" />
              </span>{" "}
            </>
          )}

          {type === "team" ? "Groups" : "Connections"}
        </p>
        <AddChannel
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
          type={type === "team" ? "team" : "messaging"}
          setToggleContainer={setToggleContainer}
        />
      </div>
      {children}
    </div>
  );
};

export default TeamChannelList;

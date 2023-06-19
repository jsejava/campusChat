import React from "react";
import { Channel, MessageTeam } from "stream-chat-react";
import { ChannelInner, CreateChannel, EditChannel } from "./";
import Cookies from "universal-cookie";
import avatarIcon from "../assets/logo/av4.png";

const cookies = new Cookies();
const username = cookies.get("username");

const avatar = cookies.get("avatarURL");

const ChannelContainer = ({
  isCreating,
  setIsCreating,
  isEditing,
  setIsEditing,
  createType,
}) => {
  if (isCreating) {
    return (
      <div className="channel__container">
        <CreateChannel createType={createType} setIsCreating={setIsCreating} />
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="channel__container">
        <EditChannel setIsEditing={setIsEditing} />
      </div>
    );
  }

  const EmptyState = () => (
    <div className="channel-empty__container">
      <p className="channel-empty__first  text-success">
        Welcome to new campus group
      </p>
      <p className="channel-empty__first">
        <i>This is the beginning of your chat history.</i>
      </p>
      <p className="channel-empty__second">
        Send messages, attachments, links, emojis, and more!
      </p>
    </div>
  );

  return (
    <div className=" channel__container">
      <div className="position-relative p-8 ms-4 rounded-2">
        <div className="d-flex mb-6 align-items-center">
          {/* <button className="btn  btn-primary mt-4 mb-4 ms-5 me-5"> */}
          <div className="channel-list__sidebar__icon3">
            <div className="icon1__inner">
              {avatar ? (
                <img src={avatar} alt="Logout" width="30" />
              ) : (
                <img src={avatarIcon} alt="Logout" width="30" />
              )}
            </div>
          </div>
          <span
            style={{
              // backgroundColor: "red",
              color: "#1f3302",
              fontSize: 22,
            }}
          >
            {username}
          </span>
          {/* </button> */}
        </div>
      </div>
      <Channel
        EmptyStateIndicator={EmptyState}
        Message={(messageProps, i) => <MessageTeam key={i} {...messageProps} />}
      >
        <ChannelInner setIsEditing={setIsEditing} />
      </Channel>
    </div>
  );
};

export default ChannelContainer;

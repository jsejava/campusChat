import React, { useState } from "react";
import { ChannelList, useChatContext } from "stream-chat-react";
import Cookies from "universal-cookie";

import { ChannelSearch, TeamChannelList, TeamChannelPreview } from "./";

import ConnectIcon from "../assets/logo/chat.png";
import ShopIcon from "../assets/logo/shop.png";
import ServiceIcon from "../assets/logo/service.png";
import PayIcon from "../assets/logo/pay-5.png";
import LogoutIcon from "../assets/logo/lg1.png";
import avatarIcon from "../assets/logo/av4.png";
import shopUrl from "../appUrl/shopUrl";
import serviceUrl from "../appUrl/serviceUrl";
import payUrl from "../appUrl/payUrl";

const cookies = new Cookies();

const username = cookies.get("username");
const avatar = cookies.get("avatarURL");

// console.log(cookies);

const SideBar = ({ logout }) => (
  <div className="channel-list__sidebar">
    <div className="channel-list__sidebar__icon1">
      <a className="icon1__inner" href="#">
        <img src={ConnectIcon} alt="CampusConnection" width="30" />
      </a>
    </div>

    <div className="channel-list__sidebar__icon1">
      <a className="icon1__inner" href={shopUrl}>
        <img src={ShopIcon} alt="shopIcon" width="30" />
      </a>
    </div>
    <div className="channel-list__sidebar__icon1">
      <a className="icon1__inner" href={serviceUrl}>
        <img src={ServiceIcon} alt="ServiceIcon" width="30" />
      </a>
    </div>
    <div className="channel-list__sidebar__icon1">
      <a className="icon1__inner" href={payUrl}>
        <img src={PayIcon} alt="payIcon" width="30" />
      </a>
    </div>
    <div className="channel-list__sidebar__icon1">
      <div className="icon1__inner" onClick={logout}>
        <img src={LogoutIcon} alt="Logout" width="30" />
      </div>
    </div>
  </div>
);

const CompanyHeader = () => (
  <>
    <div className="channel-list__header">
      <div className="channel-list__sidebar__icon1">
        <div className="icon3__inner">
          <img
            src="https://www.unco.edu/campus-connections/images/unc-campus-connections.png"
            //src="https://collegian.com/wp-content/uploads/2016/03/302671_CampusConnections-logo.png"
            alt="Logout"
            width="100"
          />
        </div>
      </div>
      {/* code here */}
      {/* <div className="btn  btn-outline-warning mt-3 ms-5 w-50" href="#">
        Hi! {username}
      </div> */}
    </div>
    <div className="position-relative p-8 ms-4 rounded-2">
      <div className="d-flex mb-6 align-items-center">
        {/* <button className="btn  btn-primary mt-4 mb-4 ms-5 me-5"> */}
        <div className="channel-list__sidebar__icon3">
          <div className="icon1__inner">
            {avatar ? (
              <img src={avatar} alt="Logout" width="30" />
            ) : (
              <img
                src="https://cdn2.iconfinder.com/data/icons/danger-problems-2/512/xxx003-1024.png"
                alt="Logout"
                width="30"
              />
            )}
          </div>
        </div>
        <span
          style={{
            // backgroundColor: "red",
            color: "whitesmoke",
            fontSize: 22,
          }}
        >
          {username}
        </span>
        {/* </button> */}
      </div>
    </div>
  </>
);

const customChannelTeamFilter = (channels) => {
  return channels.filter((channel) => channel.type === "team");
};

const customChannelMessagingFilter = (channels) => {
  return channels.filter((channel) => channel.type === "messaging");
};

const ChannelListContent = ({
  isCreating,
  setIsCreating,
  setCreateType,
  setIsEditing,
  setToggleContainer,
}) => {
  const { client } = useChatContext();

  const logout = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("username");
    cookies.remove("fullName");
    cookies.remove("avatarURL");
    cookies.remove("hashedPassword");
    cookies.remove("phoneNumber");

    window.location.reload();
  };

  const filters = { members: { $in: [client.userID] } };

  return (
    <>
      <SideBar logout={logout} />
      <div className="channel-list__list__wrapper">
        <CompanyHeader />
        <ChannelSearch setToggleContainer={setToggleContainer} />
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelTeamFilter}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              type="team"
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
              type="team"
            />
          )}
        />
        <ChannelList
          filters={filters}
          channelRenderFilterFn={customChannelMessagingFilter}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              type="messaging"
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
              type="messaging"
            />
          )}
        />
      </div>
    </>
  );
};

const ChannelListContainer = ({
  setCreateType,
  setIsCreating,
  setIsEditing,
}) => {
  const [toggleContainer, setToggleContainer] = useState(false);

  return (
    <>
      <div className="channel-list__container">
        <ChannelListContent
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
        />
      </div>

      <div
        className="channel-list__container-responsive"
        style={{
          left: toggleContainer ? "0%" : "-88%",
          backgroundColor: "#005fff",
        }}
      >
        <div
          className="channerl-list__container-toggle"
          onClick={() =>
            setToggleContainer((prevToggleContainer) => !prevToggleContainer)
          }
        ></div>
        <ChannelListContent
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
          setToggleContainer={setToggleContainer}
        />
      </div>
    </>
  );
};

export default ChannelListContainer;

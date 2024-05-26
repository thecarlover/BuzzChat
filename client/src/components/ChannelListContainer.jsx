import React, { useEffect, useState } from "react";
import { ChannelList, useChatContext } from "stream-chat-react";
import Cookies from "universal-cookie";
import { ChannelSearch, TeamChannelList, TeamChannelPreview } from "./";
import chatIcon from "../assets/chat.png";
import logoutIcon from "../assets/logout.png";

const cookies = new Cookies();

// Sidebar for the web app
const SideBar = ({ logout }) => {
  return (
    <div className="flex flex-col items-center bg-gray-800 h-screen p-4 w-20">
      <div className="flex flex-col items-center mb-8">
        <div className="bg-gray-700 p-2 rounded-full">
          <img src={chatIcon} alt="Logo" width="30" className="filter invert" />
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="bg-gray-700 p-2 rounded-full cursor-pointer" onClick={logout}>
          <img src={logoutIcon} alt="Logout" width="30" className="filter invert" />
        </div>
      </div>
    </div>
  );
};

// Company header for the web app
const CompanyHeader = () => (
  <div className="flex flex-col items-center bg-gray-900 h-full p-4 w-72">
    <div className="text-white font-bold text-xl mb-8">Buzzchat</div>
  </div>
);

const ChannelListContainer = () => {
  const [channelsExist, setChannelsExist] = useState(false);
  const [selectedType, setSelectedType] = useState("messaging"); // Default to messaging


  //TODO:do logic

  useEffect(() => {
    // Fetch channels here and update channelsExist accordingly
    const areChannelsAvailable = true; // Replace with your logic
    setChannelsExist(areChannelsAvailable);
  }, []);

  const logout = () => {
    cookies.remove("token");
    cookies.remove("username");
    cookies.remove("userId");
    cookies.remove("fullName");
    cookies.remove("phoneNumber");
    cookies.remove("avatarURL");
    cookies.remove("hashedPassword");

    window.location.reload();
  };

  const handleTypeChange = (type) => {
    setSelectedType(type)
  };
  

  return (
    <div className="flex h-screen">
      <SideBar logout={logout} />
      <div className="flex flex-1 flex-col bg-gray-200">
        <CompanyHeader />

        <div className="flex flex-col flex-1 p-4">
          <div className="flex mb-4">
            <div
              className={`cursor-pointer rounded-md p-2 mr-4 ${
                selectedType === "messaging" ? "bg-blue-500 text-white" : "bg-gray-300"
              }`}
              onClick={() => handleTypeChange("messaging")}
            >
              Direct Message
            </div>
            <div
              className={`cursor-pointer rounded-md p-2 ${
                selectedType === "team" ? "bg-blue-500 text-white" : "bg-gray-300"
              }`}
              onClick={() => handleTypeChange("team")}
            >
              Team Channel
            </div>
          </div>

          <h2 className="text-gray-600 font-semibold mb-2">
            {selectedType === "messaging" ? "Direct Messages" : "Team Channels"}
          </h2>
          <div className="max-h-80 overflow-y-auto">
            {channelsExist ? (
              <ChannelList
                filters={{ type: selectedType }}
                List={(listProps) => <TeamChannelList {...listProps} type={selectedType} />}
                Preview={(previewProps) => <TeamChannelPreview {...previewProps} type={selectedType} />}
              />
            ) : (
              <p className="text-gray-600 text-center">You have no channels currently</p>
            )}
          </div>
        </div>

        <ChannelSearch />
      </div>
    </div>
  );
};

export default ChannelListContainer;

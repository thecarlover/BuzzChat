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
  <div className="flex flex-col items-center bg-gray-900 h-full p-10 w-72">
    <div className="text-white font-bold text-xl mb-8">Buzzchat</div>
  </div>
);

const ChannelListContainer = () => {
  const [channelsExist, setChannelsExist] = useState(false);

  useEffect(() => {
    // Fetch channels here and update channelsExist accordingly
    const areChannelsAvailable = true; // Replace with your logic
    setChannelsExist(areChannelsAvailable);
  }, []);   //TODO :do it 

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

  return (
    <div className="flex h-screen">
      <SideBar logout={logout} />
      <div className="flex flex-1 flex-col bg-gray-700">
        <CompanyHeader />
        
        <div className="main_option_div grid">
          <div className="direct_message max-h-40 overflow-y-auto p-2 rounded-md bg-gray-800">
            {channelsExist ? (
              <ChannelList
                filters={{ type: "messaging" }}
                List={(listProps) => <TeamChannelList {...listProps} type="messaging" />}
                Preview={(previewProps) => <TeamChannelPreview {...previewProps} type="messaging" />}
              />
            ) : (
              <p className="text-white text-center">No Direct Messages available.</p>
            )}
          </div>

          <div className="team_message max-h-40 overflow-y-auto p-2 rounded-md bg-gray-800">
            {channelsExist ? (
              <ChannelList
                filters={{ type: "team" }}
                List={(listProps) => <TeamChannelList {...listProps} type="team" />}
                Preview={(previewProps) => <TeamChannelPreview {...previewProps} type="team" />}
              />
            ) : (
              <p className="text-white text-center">No Team Channels available.</p>
            )}
          </div>
        </div>

        <ChannelSearch />
      </div>
    </div>
  );
};

export default ChannelListContainer;

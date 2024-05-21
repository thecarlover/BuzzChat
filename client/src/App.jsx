import React, { useState } from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import 'stream-chat-react/dist/css/index.css';
import "./index.css";



import { ChannelListContainer, ChannelContainer, Auth } from "./components";

const cookies = new Cookies();

const apiKey = "xw7kcu5xxfm7";

const client = StreamChat.getInstance(apiKey);

const authToken = cookies.get("token");

if (authToken) {
  client.connectUser(
    {
      // token:cookies.get('token'), we have already defined
      id: cookies.get("userId"),
      name: cookies.get("username"),
      fullName: cookies.get("fullName"),
      phoneNumber: cookies.get("phoneNumber"),
      image: cookies.get("avatarURL"),
      hashedPassword: cookies.get("hashedPassword"),
    },
    authToken
  );
}

const App = () => {
  const [createType, setCreateType] = useState();
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  //token for auth then we hide
  if (!authToken) return <Auth />;

  return (
    <div className="flex">
      <Chat client={client} theme="theme light">
        <ChannelListContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
        />
        <ChannelContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          createType={createType}
        />
      </Chat>
    </div>
  );
};

export default App;

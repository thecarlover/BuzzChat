import React, { useState } from 'react';
import { MessageList, MessageInput, Thread, Window, useChannelActionContext, Avatar, useChannelStateContext, useChatContext, Channel } from 'stream-chat-react';

import { EmojiPicker } from 'stream-chat-react/emojis';
import { ChannelInfo } from '../assets/ChannelInfo';

export const GiphyContext = React.createContext({});

const ChannelInner = ({ setIsEditing }) => {
    const [giphyState, setGiphyState] = useState(false);
    const { sendMessage } = useChannelActionContext();
  
    const overrideSubmitHandler = (message) => {
        let updatedMessage = {
            attachments: message.attachments,
            mentioned_users: message.mentioned_users,
            parent_id: message.parent?.id,
            parent: message.parent,
            text: message.text,
        };
    
        if (giphyState) {
            updatedMessage = { ...updatedMessage, text: `/giphy ${message.text}` };
        }
    
        if (sendMessage) {
            sendMessage(updatedMessage);
            setGiphyState(false);
        }
    };

    return (
        <GiphyContext.Provider value={{ giphyState, setGiphyState }}>
            <div className="flex flex-col h-screen bg-gray-100 w-full">
                <Channel EmojiPicker={EmojiPicker}>
                    <Window className="flex-grow">
                        <TeamChannelHeader setIsEditing={setIsEditing} />
                        <MessageList />
                        <MessageInput overrideSubmitHandler={overrideSubmitHandler} />
                    </Window>
                    <Thread />
                </Channel>
            </div>
        </GiphyContext.Provider>
    );
};

const TeamChannelHeader = ({ setIsEditing }) => {
    const { channel, watcher_count } = useChannelStateContext();
    const { client } = useChatContext();

    const MessagingHeader = () => {
        const members = Object.values(channel.state.members).filter(({ user }) => user.id !== client.userID);
        const additionalMembers = members.length - 3;

        if(channel.type === 'messaging') {
            return (
                <div className="flex items-center">
                    {members.map(({ user }, i) => (
                        <div key={i} className="flex items-center mr-2">
                            <Avatar image={user.image} name={user.fullName || user.id} size={32} />
                            <p className="ml-2 text-sm font-medium text-gray-800">{user.fullName || user.id}</p>
                        </div>
                    ))}
                    {additionalMembers > 0 && <p className="ml-2 text-sm font-medium text-gray-800">and {additionalMembers} more</p>}
                </div>
            );
        }
            
        return (
            <div className="flex justify-between items-center">
                <p className="text-xl font-bold text-gray-800"># {channel.data.name}</p>
                <span className="flex cursor-pointer" onClick={() => setIsEditing(true)}>
                    <ChannelInfo />
                </span>
            </div>
        );
    };

    const getWatcherText = (watchers) => {
        if (!watchers) return 'No users online';
        if (watchers === 1) return '1 user online';
        return `${watchers} users online`;
    };

    return (
        <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-white">
            <MessagingHeader />
            <div className="text-gray-500">
                <p>{getWatcherText(watcher_count)}</p>
            </div>
        </div>
    );
};

export default ChannelInner;

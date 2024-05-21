// ChannelContainer.jsx
import React from 'react';
import { Channel, MessageSimple } from 'stream-chat-react';

import { ChannelInner, CreateChannel, EditChannel } from './';

const ChannelContainer = ({ isCreating, setIsCreating, isEditing, setIsEditing, createType }) => {
    if (isCreating) {
        return (
            <div className="h-screen bg-gray-100 flex items-center justify-center w-full">
                <CreateChannel createType={createType} setIsCreating={setIsCreating} />
            </div>
        );
    }

    if (isEditing) {
        return (
            <div className="h-screen bg-gray-100 flex items-center justify-center w-full">
                <EditChannel setIsEditing={setIsEditing} />
            </div>
        );
    }

    const EmptyState = () => (
        <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <p className="text-lg font-semibold">This is the beginning of your chat history.</p>
            <p className="text-sm text-gray-600">Send messages, attachments, links, emojis, and more!</p>
        </div>
    );

    return (
        <div className="h-screen bg-gray-800 flex flex-col w-full">
            <div className="flex-grow">
                <Channel
                    EmptyStateIndicator={EmptyState}
                    Message={(messageProps, i) => <MessageSimple key={i} {...messageProps} />}
                >
                    <ChannelInner setIsEditing={setIsEditing} className="flex-grow w-full" />
                </Channel>
            </div>
        </div>
    );
}

export default ChannelContainer;

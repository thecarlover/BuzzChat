import React from 'react'
import { Avatar, useChatContext } from 'stream-chat-react'

const TeamChannelPreview = ({ channel, type }) => {
    const { channel: activeChannel, client } = useChatContext();

    const ChannelPreview = () => (
        <p className='text-base font-medium'>
            # {channel?.data?.name || channel?.data?.id}
        </p>
    );

    const DirectPreview = () => {
        const members = Object.values(channel.state.members).filter(({ user }) => user.id !== client.userID);

        return (
            <div className='flex items-center space-x-2'>
                <Avatar 
                    image={members[0]?.user?.image} 
                    name={members[0]?.user?.fullName || members[0]?.user?.id} 
                    size={24} 
                />
                <p className='text-base font-medium'>
                    {members[0]?.user?.fullName || members[0]?.user?.id}
                </p>
            </div>
        )
    }

    return (
        <div 
            className={`p-2 cursor-pointer ${channel?.id === activeChannel?.id ? 'bg-blue-500 text-white' : 'bg-white text-black'} rounded-md hover:bg-blue-100`}
            onClick={() => { console.log(channel); }}
        >
            {type === 'team' ? <ChannelPreview /> : <DirectPreview />}
        </div>
    )
}

export default TeamChannelPreview

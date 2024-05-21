// TeamChannelList.js
import React from 'react';
import { AddChannel } from '../assets/AddChannel';

const TeamChannelList = ({ children, error = false, loading, type }) => {
  if (error) {
    return type === 'team' ? (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-400">
          Connection error, please wait a moment and try again.
        </p>
      </div>
    ) : null;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500">
          {type === 'team' ? 'Channels' : 'Messages'} loading...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-gray-800 text-white">
        <p className="text-lg font-semibold text-gray-800">
          {type === 'team' ? 'Channels' : 'Direct Messages'}
        </p>
        {type === 'team' && <AddChannel />} {/* AddChannel button for team channels */}
      </div>
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default TeamChannelList;

import React, { useState } from 'react';
import { useChatContext } from 'stream-chat-react';
import SearchIcon from '../assets/search.png'; // Adjust the import according to your actual icon path

const ChannelSearch = () => {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);

    const onSearch = (event) => {
        event.preventDefault();
        setLoading(true);
        setQuery(event.target.value);
        
        const getChannel = async (text) => {
            try {
                // TODO: fetch Channel
                console.log("Searching for channel:", text);
            } catch (error) {
                setQuery('');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        getChannel(event.target.value);
    };

    return (
        <div className='p-4'>
            <form onSubmit={onSearch} className='flex items-center bg-gray-700 p-2 rounded'>
                <div className='mr-2'>
                    <img src={SearchIcon} alt='Search' width='24' className='filter invert' />
                </div>
                <input
                    type='text'
                    className='flex-1 bg-transparent outline-none text-white placeholder-gray-400'
                    placeholder='Search for channels'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </form>
            {loading && <div className='text-white mt-2'>Loading...</div>}
        </div>
    );
};

export default ChannelSearch;

import React from 'react'
import { messageType } from '@/types';

function ClientMessage(message: messageType) {
    const username = message?.username || 'Anonymous';
    const userInitial = username.charAt(0).toUpperCase();
    return (
        <div className='flex  w-2/4 my-1 bg-primary p-2 rounded-md' >
            <div className='w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold mr-3'>
                {userInitial}
            </div>
            <div className='w-full'>
                <div className='flex items-center justify-between text-white font-extralight tracking-wide'>
                    <div className='flex items-center'>{username}</div>
                    <span>{message?.timestamp}</span>
                </div>
                <p className='text-white text-lg font-medium'>{message?.content}</p>
            </div>
        </div>
    )
}

export default ClientMessage;
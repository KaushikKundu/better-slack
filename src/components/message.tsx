import React from 'react'
import { messageType } from '@/types';

function ClientMessage({username,content,isOwnMessage,timestamp}: messageType) {
    return (
        <div className={`mb-4 max-w-lg lg:max-w-md ${isOwnMessage ? 'ml-auto' : 'mr-auto'}`}>
            <div className={`rounded-lg px-4 py-2 ${
                isOwnMessage 
                    ? 'bg-primary text-white rounded-br-none' 
                    : 'bg-secondary text-black rounded-bl-none'
            }`}>
                {!isOwnMessage && (
                    <p className=" mb-0.5 text-gray-500  font-extralight">{username}</p>
                )}
                <p className="text-md font-semibold">{content}</p>
                <p className={`text-xs mt-1 ${
                    isOwnMessage ? 'text-blue-100' : 'text-gray-500'
                }`}>
                    {timestamp}
                </p>
            </div>
        </div>
    )
}

export default ClientMessage;
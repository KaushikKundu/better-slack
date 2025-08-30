import React from 'react'
import { messageType } from '@/types';

function ClientMessage({username,content,isOwnMessage,timestamp}: messageType) {
    const userInitial = username.charAt(0).toUpperCase();
    return (
        <div className={`mb-4 max-w-xs lg:max-w-md ${isOwnMessage ? 'ml-auto' : 'mr-auto'}`}>
            <div className={`rounded-lg px-4 py-2 ${
                isOwnMessage 
                    ? 'bg-blue-500 text-white rounded-br-none' 
                    : 'bg-gray-200 text-gray-800 rounded-bl-none'
            }`}>
                {!isOwnMessage && (
                    <p className="text-xs font-semibold mb-1">{username}</p>
                )}
                <p className="text-sm">{content}</p>
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
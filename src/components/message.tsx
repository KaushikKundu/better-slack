import React from 'react'
type MessageProps = {
    username: string;   
    content: string;
    timestamp: string;
}

function Message(message: MessageProps) {
    const username = message?.username || 'Anonymous';
    const userInitial = username.charAt(0).toUpperCase();
    return (
        <div className='flex items-start w-2/3 my-3 bg-accent p-2 rounded-b-sm' >
            <div className='w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold mr-3'>
                {userInitial}
            </div>
            <div className='w-full'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center'>{username}</div>
                    <span>{message?.timestamp}</span>
                </div>
                <p>{message?.content}</p>
            </div>
        </div>
    )
}

export default Message;
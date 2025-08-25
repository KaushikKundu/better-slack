import React from 'react'
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
const rooms = ['general', 'random', 'sports', 'news', 'travel', 'food'];
const messages = [
    {
        id: 1,
        username: 'John',
        content: 'Hello, everyone!',
        timestamp: '10:00 AM'
    },
    {
        id: 2,
        username: 'Alice',
        content: 'Hi, John! How are you?',
        timestamp: '10:01 AM'
    }
]
function page() {
    return (
        <main className='flex h-screen'>
            <div className='w-48  h-screen p-3 flex flex-col border-gray-300 border-r'>
                <Button className='w-full cursor-pointer' >Create Room</Button>
                <Input className='mt-3 ' placeholder='Search Room' />
                <div>
                    {
                        rooms.map((room) => (
                            <h1 key={room} className='p-2 mt-3 rounded cursor-pointer '># {room}</h1>
                        ))
                    }
                </div>
            </div>
            <div className='flex-1 h-screen '>
                <div className='h-16 border-b border-gray-300 flex items-center px-3'>
                    <h1 className='font-bold text-lg'># general</h1>
                </div>
                <div className='h-[calc(100vh-8rem)] overflow-y-auto px-3'>
                    {
                        messages.map((message) => (
                            <div className='flex items-start my-3 bg-accent p-2 rounded-b-sm' key={message.id}>
                                <div className='w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold mr-3'>
                                    {message.username.charAt(0).toUpperCase()}
                                </div>
                                <div className='w-full'>
                                    <div className='flex items-center justify-between'>
                                        <div className='flex items-center'>{message.username}</div>
                                        <span>{message.timestamp}</span>
                                    </div>
                                    <p>{message.content}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <Textarea placeholder='Enter your text ' />
            </div>
        </main>
    )
}

export default page;